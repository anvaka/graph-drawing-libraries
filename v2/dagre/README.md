## dagre

https://github.com/dagrejs/dagre - warning, library mentions it is deprecated

## Things I like

* Lists paper that describes implementation algorithm
* Pretty graph layouts for simple grids/trees: https://twitter.com/anvaka/status/1558885283143094272

## Things I don't like

* Being deprecated is never good. Would be nice to have alternative listed in the readme?
* It is layout only library, need your own renderer to renderer
* Bundled graph data structure, no ESM.
* Have to be very explicit with properties, even when they seem optional. Missing these options blows up:
 - `g.setGraph({})`
 - `g.setDefaultEdgeLabel(function() { return {}; });`
 - node's `width` and `height`