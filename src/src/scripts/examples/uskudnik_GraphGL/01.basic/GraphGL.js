// @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function GraphGL(options) {
	var that = this; // needed due to a couple of clousers
		
	// Default options
	this.options = {
		canvas: {},
		nodes: {
			color: 0xFF813A,
			scale: 20
		},
		edges: {
			type: "line",
			color: 0x4193F8,
		},
		logging: true,
	}
	// merge defaults and specified options options
	for (var np in options) {
		this.options[np] = options[np];
	}
		
	this.layoutWorker;
	
	this.events = {};
	
	this.renderingStarted = false;
	
	this.VIEW_ANGLE = 45;
	var	viewField = this.options.width / Math.tan(this.VIEW_ANGLE * Math.PI/180); // Distance, at which entire drawing area is seen
		ASPECT = this.options.width / this.options.height,
		NEAR = 0.1; // object close then NEAR wont be seen
		 
	this.FAR = viewField+500; // object further then FAR wont be seen; must block zoom before
	
	this.renderer = new THREE.WebGLRenderer({
		clearColor: this.options.canvas.backgroundColor,
		antialias: true,
		enableDepthBufferWrite: true
	});
	this.renderer.sortObjects = false;
	this.renderer.setSize(this.options.width, this.options.height);	
	jQuery(this.options.canvas.canvasId).append(this.renderer.domElement);
	
	this.camera = new THREE.PerspectiveCamera(
		this.VIEW_ANGLE,
		ASPECT,
		NEAR,
		this.FAR);
	
	this.camera.position.z = viewField;
	
	console.log("cam: ", this.camera.position);
	
	this.scene = new THREE.Scene();
	// this.scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

	// this.camera.lookAt( this.scene.position );
	
	console.log("cam #2: ", this.camera.position);
	
	
	// Basic geometry
	// this.node_geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
	
	// this.node_material = new THREE.MeshShaderMaterial({
	// 	vertexShader: $("#node-vertexShader").text(),
	// 	fragmentShader: $("#node-fragmentShader").text()
	// });
	
	// this.edge_material = new THREE.MeshShaderMaterial({
	// 	vertexShader: $("#edge-vertexShader").text(),
	// 	fragmentShader: $("#edge-fragmentShader").text()
	// });
	
	this.NodeAttributes = {
		aColor: {
			type: "c", 
			value: []
		},
		size: {
			type: "f",
			value: []
		}
	};
	
	// attributes: this.nodeAttributes,
	this.NodeShader = new THREE.ShaderMaterial({
		attributes: this.NodeAttributes,
		vertexShader: $("#node-vertexShader").text(),
		fragmentShader: $("#node-fragmentShader").text()
	});
	
	this.NodeSystem;
	this.Nodes = {};
	this.Nodes.geometry = new THREE.Geometry();
	this.Nodes.nodes = {};
	
	// Master geometries	
	this.Edges = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial( { color: this.options.edges.color, opacity: 0.2, linewidth: 1} ), THREE.LinePieces);
	// this.Edges.renderDepth = 0;
	this.Edges.edges = [];
	
	this.connectedEdges = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial( { color: this.options.selectColor, opacity: 0.8, linewidth: 2} ), THREE.LinePieces);
	// this.connectedEdges.dynamic = true;
	this.connectedEdges.edges = [];
		
	// Events
	this.events.mouse = {};
	this.events.mouse.position = new THREE.Vector3();
	
	this.events.selectedNodes = [];
	// this.events.nodes.selected = false;
	
	// For dragging around canvas
	$(this.renderer.domElement).mousedown(function(ev){
		// console.log("edges: ", that.Edges.materials[0].opacity);
		// that.Edges.materials[0].opacity = 0.8;
		that.events.mouse.down = true;
		that.events.mouse.position.set(ev.pageX, ev.pageY, 0);
		
		
	});
	$(this.renderer.domElement).bind("mouseup mouseleave", function(ev){
		that.events.mouse.down = false;
	});
	
	$(this.renderer.domElement).mousemove(function(ev){
		if (that.events.mouse.down){			
			var difX = (-1)*(ev.pageX - that.events.mouse.position.x)*(that.camera.position.z/viewField);
			var difY = (ev.pageY - that.events.mouse.position.y)*(that.camera.position.z/viewField);
			
			that.camera.translateX(difX);
			that.camera.translateY(difY);
		}
		
		// that.events.mouse.x = ev.pageX;
		// that.events.mouse.y = ev.pageY;
		
		that.events.mouse.position.set(ev.pageX, ev.pageY, 0);
	});
	
	// Zooming
	// Middle of canvas vector
	this.options.r0 = new THREE.Vector3(
		$(this.renderer.domElement).offset().left+this.options.width/2,
		$(this.renderer.domElement).offset().top+this.options.height/2,
		0);

	$(this.renderer.domElement).bind("mousewheel DOMMouseScroll",
		function(ev){						
			var difZ;
			
			if (ev.type == "DOMMouseScroll") difZ = ev.detail; // Firefox
			else difZ = ev.wheelDelta;

			// console.log(difZ);
			var r = new THREE.Vector3();
			r.sub(that.events.mouse.position, that.options.r0);
			
			// Move to mouse cursor - still needs some work		
			// console.log(that.camera.position.z - difZ);
			difZ = difZ *(that.camera.position.z/that.camera.far)*10;
			// r.multiplyScalar((that.camera.position.z/that.camera.far)*20);
			if ((that.camera.position.z - difZ) < that.FAR && (that.camera.position.z - difZ) > 50) {
				that.camera.translateX((difZ / that.camera.position.z)*r.x);
				that.camera.translateY(-(difZ / that.camera.position.z)*r.y);
				that.camera.position.z = that.camera.position.z - difZ;
			}
	});
	
	// Interactivity
	this.projector = new THREE.Projector();
	$(this.renderer.domElement).click(function(ev){
		// First remove old connected edges and reset color of selected node(s)
		that.scene.removeObject(that.connectedEdges);
		var i = that.events.selectedNodes.length;
		while(i--) {
			that.events.selectedNodes[i].materials[0].uniforms.color.value = that.hexColorToRGB(that.options.nodes.color);
		}
		
		that.connectedEdges = new THREE.Line(new THREE.Geometry(), new THREE.LineBasicMaterial( { color: that.options.nodes.selectColor, opacity: 0.8, linewidth: 2} ), THREE.LinePieces);
		that.connectedEdges.edges = [];
		
		//Calculate position of a click		
		clickPosition = new THREE.Vector3(ev.pageX, ev.pageY, that.camera.position.z);
		
		clickPosition.subSelf(that.options.r0);
		// To invert y axis
		clickPosition.multiplySelf({x: 1, y: -1, z: 1});

		var cp = new THREE.Vector3().add(that.camera.position, clickPosition.clone().multiplyScalar(that.camera.position.z/viewField));
		
		// Move to correct plane
		cp.z = 0;
		
		clickPosition.subSelf(that.camera.position);
		
		// for(var obji in that.graph.nodes) {
		// 			var node = that.graph.nodes[obji];
		// 			var	distance = node.position.distanceTo(cp);
		// 			
		// 			if (distance < node.boundRadiusScale) {
		// 				console.log("Intersect: ", node);
		// 				that.events.selectedNodes.push(node);
		// 				// console.log("nodepos: ", node.position.x, node.position.y);
		// 				node.materials[0].uniforms.color.value = that.hexColorToRGB(that.options.nodes.selectColor);
		// 				
		// 				var i = that.Edges.edges.length;
		// 				while(i--) {
		// 					var edge = that.Edges.edges[i];
		// 					if (edge.source == node.data.id) {		
		// 						that.connectedEdges.geometry.vertices.push(new THREE.Vector3());
		// 						that.connectedEdges.geometry.vertices.push(new THREE.Vector3());
		// 						that.connectedEdges.edges.push(edge);
		// 					}
		// 				}
		// 				
		// 				that.scene.addObject(that.connectedEdges);
		// 			}			
		// 		}
	});
	
	// Said to be better for performance
	this.pointLight = new THREE.DirectionalLight(0xFFFFFF);
	this.scene.addObject(this.pointLight);
}

GraphGL.StaticLayout = function() {
	console.log("Static layout");
	
	var xmin = 0, xmax = 0;
	var ymin = 0, ymax = 0;
	var nodes = this.Nodes.nodes;
	
	var geo = this.NodeSystem.geometry.vertices;
	var vcolor = this.NodeAttributes.aColor.value;
	var vsize = this.NodeAttributes.size.value;
	
	for (var n in nodes) {
		var node = nodes[n];
		var data = node.data;

		xmin = Math.min(xmin, data.x);
		xmax = Math.max(xmax, data.x);
		ymin = Math.min(ymin, data.y);
		ymax = Math.max(ymax, data.y);
		node.position = new THREE.Vector3(data.x, data.y, 0);
		
		geo[node.vertice].position = new THREE.Vector3(data.x, data.y, 0);
		vcolor[node.vertice] = new THREE.Color().setRGB(data.r / 255, data.g / 255, data.b / 255);
		vsize[node.vertice] = data.size ? data.size : 3;
	}
	var xmax = Math.max(Math.abs(xmin), Math.abs(xmax));
	var ymax = Math.max(Math.abs(ymin), Math.abs(ymax));

	var viewField = Math.max(xmax, ymax) / Math.tan(this.VIEW_ANGLE * Math.PI/180);
	this.FAR = viewField + 500;
	this.camera.far = viewField+500;
	this.camera.updateProjectionMatrix();
	
	var edges = this.Edges.edges;
	var edges_vertices = this.Edges.geometry.vertices;
	var i = edges.length;
	while (i--) {
		var src = edges[i].source;
		var trg = edges[i].target;
		
		var isrc = i*2;
		var itrg = i*2+1;
		
		edges_vertices[isrc].position = src.position;
		edges_vertices[isrc].position.z = -1;
		
		edges_vertices[itrg].position = trg.position;
		edges_vertices[itrg].position.z = -1;
	}
	
	this.NodeSystem.geometry.__dirtyVertices = true;
	this.Edges.geometry.__dirtyVertices = true;
	
	this.NodeAttributes.aColor.needsUpdate = true;
	this.NodeAttributes.size.needsUpdate = true;
	this.animate();
}

GraphGL.DynamicLayout = function() {
	console.log("Dynamic layout ");
	
	var that = this;
	
	this.layoutWorker = new Worker(this.options.layout.algorithm);
		// this.layoutWorker.postMessage(function() {
		// 		return that.options.layoutSend.call(that);
		// }());
	this.graphData.algorithmOptions = this.options.layout.algorithmOptions;
	this.layoutWorker.postMessage(this.graphData);
	
	this.layoutWorker.onmessage = function(msg) {
		if (msg.data.type == "log") {
			console.log(msg.data.log);
			return;
		}
		
		GraphGL.DynamicLayout.layoutUpdate.call(that, msg.data);
		
		if (!that.renderingStarted) {
			that.renderingStarted = true;
			console.log("animiram");
			that.animate();
		}
	};
		
	this.layoutWorker.onerror = function(event) {
	    console.log("Worker error: ", event.message + " (" + event.filename + ":" + event.lineno + ")");
	};
}

GraphGL.DynamicLayout.layoutUpdate = function(data) {
	console.log("Layout update: ", data);
	var that = this;

	var mx = this.options.width - 100;
	var my = this.options.height - 100;
	
	var boundingBox = data.boundingBox;
	var x, y;
	
	var geo = this.NodeSystem.geometry.vertices;
	// var vcolor = this.NodeAttributes.aColor.value;
	// var vsize = this.NodeAttributes.size.value;
	
	for(var nid in data.nodes) {
		o = this.Nodes.nodes[nid];
		u = data.nodes[nid]; // updated node
		
		
		x = u.x / (boundingBox.maxx - boundingBox.minx) * mx;
		y = u.y / (boundingBox.maxy - boundingBox.miny) * my;
		
		o.position.x = x;
		o.position.y = y;
		
		geo[o.vertice].position = new THREE.Vector3(x, y, 0);
	}
	
	var edges = this.Edges.edges;
	var edges_vertices = this.Edges.geometry.vertices;
	var i = edges.length;
	while (i--) {
		var src = edges[i].source;
		var trg = edges[i].target;
		
		var isrc = i*2;
		var itrg = i*2+1;
		
		edges_vertices[isrc].position = src.position;
		edges_vertices[isrc].position.z = -1;
		
		edges_vertices[itrg].position = trg.position;
		edges_vertices[itrg].position.z = -1;
	}
	
	this.NodeSystem.geometry.__dirtyVertices = true;
	this.Edges.geometry.__dirtyVertices = true;
	
	this.NodeAttributes.aColor.needsUpdate = true;
	this.NodeAttributes.size.needsUpdate = true;
}

GraphGL.prototype.addNode = function(nodedata) {
	var color, size;
	
	this.Nodes.geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(0, 0, 0)));
	this.Nodes.nodes[nodedata.id] = {
		data: nodedata.data,
		position: new THREE.Vector3(),
		vertice: this.Nodes.geometry.vertices.length - 1,
	};
	if (nodedata.data.color) {
		color = new THREE.Color().setRGB(nodedata.data.color);
		
	} else if (nodedata.data.r && nodedata.data.g && nodedata.data.b) {
		color = new THREE.Color().setRGB(nodedata.data.r/255, nodedata.data.g/255, nodedata.data.b/255)
	} else {
		color = new THREE.Color().setRGB( this.options.nodes.color );
	}
	
	if (nodedata.data.size) {
		size = nodedata.data.size
	} else {
		size = this.options.nodes.size;
	}
	
	this.NodeAttributes.aColor.value.push(color);
	this.NodeAttributes.size.value.push( size );
};

GraphGL.prototype.addEdge = function(source, target) {
	this.Edges.geometry.vertices.push(new THREE.Vertex());
	this.Edges.geometry.vertices.push(new THREE.Vertex());
	
	this.Edges.edges.push({source: this.Nodes.nodes[source], target: this.Nodes.nodes[target]});
}

GraphGL.prototype.render = function() {	
	this.renderer.render(this.scene, this.camera);
}

GraphGL.prototype.start = function() {
	// Load data and initialize when ready - overload if you have something else then JSON
	var that = this;
	
	if (this.options.data.type == "json") {
		jQuery.ajax({
			url: this.options.data.url,
			type: "GET",
			dataType: "json",
			success: function(data) {
				console.log("data init");
				that.graphData = data;
				console.log("srcdata: ", data);			
				for(var n in data.nodes) {
					that.addNode({
						id: n,
						data: data.nodes[n]
					});
				};

				that.NodeSystem = new THREE.ParticleSystem(that.Nodes.geometry, that.NodeShader);
				that.NodeSystem.dynamic = true;

				for(var e in data.edges) {
					var edge = data.edges[e];
					that.addEdge(edge.source, edge.target);
				}

				
				that.scene.addObject(that.NodeSystem);
				that.scene.addObject(that.Edges);
				that.initialize();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if (console && console.log)
					console.log("Error: ", jqXHR, textStatus, errorThrown);
			}
		});
		
	} else if (this.options.data.type == "utf") {
		// to implement
	}
	
	return this;
}

GraphGL.prototype.stop = function() {
	this.layoutWorker.terminate();
}

GraphGL.prototype.initialize = function() {
	// After initial data has been loaded and models built, we can start calculating layout and rendering
	console.log("initialize");		
	this.options.layout.type.call(this);
}