JavaScript Graph Drawing Libraries
=======================

This is a list of known graph drawing libraries. See [a website with interactive data](https://anvaka.github.io/graph-drawing-libraries/#/all).

* [antvis/G6](https://github.com/antvis/G6) - A Graph Visualization Framework in JavaScript.
* [anvaka/VivaGraphJS](https://github.com/anvaka/VivaGraphJS) - Graph drawing library for JavaScript
* [apache/echarts](https://github.com/apache/echarts) - A powerful, interactive charting and data visualization library for browser
* [cosmosgl/graph](https://github.com/cosmosgl/graph) - GPU-accelerated force graph layout and rendering
* [cytoscape/cytoscape.js](https://github.com/cytoscape/cytoscape.js) - Graph theory (network) library for visualisation and analysis
* [d3/d3-force](https://github.com/d3/d3-force) - Force-directed graph layout using velocity Verlet integration.
* [dagrejs/dagre](https://github.com/dagrejs/dagre) - Directed graph layout for JavaScript
* [dhotson/springy](https://github.com/dhotson/springy) - A force directed graph layout algorithm in JavaScript
* [fkling/JSNetworkX](https://github.com/fkling/JSNetworkX) - Build, process and analyze graphs in JavaScript (port of NetworkX)
* [GraphAlchemist/Alchemy](https://github.com/GraphAlchemist/Alchemy) - a graph drawing application built in d3.
* [jacomyal/sigma.js](https://github.com/jacomyal/sigma.js) - A JavaScript library aimed at visualizing graphs of thousands of nodes and edges
* [memgraph/orb](https://github.com/memgraph/orb) - Graph visualization library
* [samizdatco/arbor](https://github.com/samizdatco/arbor) - a graph visualization library using web workers and jQuery
* [strathausen/dracula](https://github.com/strathausen/dracula) - JavaScript layout and representation of connected graphs.
* [vasturiano/3d-force-graph](https://github.com/vasturiano/3d-force-graph) - 3D force-directed graph component using ThreeJS/WebGL
* [vasturiano/force-graph](https://github.com/vasturiano/force-graph) - Force-directed graph rendered on HTML5 canvas
* [visjs/vis-network](https://github.com/visjs/vis-network) - Display dynamic, automatically organised, customizable network views.

If you find something missing, please let me know.

## Commercial software

* [Graphistry](https://www.graphistry.com/get-started) - GPU client+server accelerated, point-and-click filtering/histograms/timebars/coloring/clustering, language-neutral REST and JavaScript/React/Python embedding APIs, [data science notebook support](https://github.com/graphistry/pygraphistry), all major browsers from last 5+ years + mobile

Video
=====

*NOTE: This video is outdated. Keeping it for historical reasons only*

Side by side rendering of the grid graph by 12 libraries: https://www.youtube.com/watch?v=Ax7KSQZ0_hk 

Website
=======

The website lives in the [src](src) folder. It is a static [Vite](https://vite.dev) project
with no backend:

```sh
cd src
npm install
npm run dev     # local development server
npm run stats   # refresh GitHub statistics in data/stats.json
npm test
npm run build   # production version in src/dist
```

* `data/libraries.json` is the list of libraries on the website. `example` points to a folder
  in `public/examples` with a "hello world" demo (`01.basic`) and a performance test (`02.perf`).
* "Run demo" in the list opens the performance test of a library (`performance/`). The page
  lists the other libraries: each is a link that draws the same graph with that library.
* `data/stats.json` holds GitHub statistics of these libraries. The
  [deploy workflow](.github/workflows/deploy.yml) runs on pushes to `main` and once a week:
  it fetches fresh statistics and publishes the website to GitHub Pages. The committed file
  is a snapshot for local development, and a fallback when GitHub API is not available.
* `app/graphs.js` is the list of graphs that the performance test can render. They are the
  graphs of the [ngraph.forcelayout demo](https://anvaka.github.io/ngraph.forcelayout/) under
  the same names, plus generators of a size that the visitor chooses. Nothing is copied here:
  `app/loadGraph.js` downloads the files from the deployed demo and from its
  [SuiteSparse](https://sparse.tamu.edu) mirror.
* `app/guard.js` keeps a slow library from freezing the tab without warning. It has no limits
  per library: the browser of the visitor remembers how large a graph each library drew well
  and on which it froze, and the performance test asks before it starts a graph that is much
  larger than the first or as large as the second.
* A pull request that changes `src` gets a preview: the
  [preview workflow](.github/workflows/preview.yml) publishes it to
  `https://anvaka.github.io/graph-drawing-libraries/pr-preview/pr-<number>/` and posts the
  link to the pull request. Pull requests from forks have no previews.

Why?
====
This repository is inspired by [@mbektimirov](https://github.com/mbektimirov)'s question [Difference with Sigma.js](https://github.com/anvaka/ngraph/issues/6). I am trying to list all known graph drawing libraries, and [inviting their authors](https://github.com/anvaka/graph-drawing-libraries/issues/1) to collaborate here.
