## Sigma.js

https://www.sigmajs.org/

Document below is work in progress.

## Architecture

Sigma.js can be split into two parts:

* graphology - a library that provides the graph structure and algorithms
* sigma - a library that provides the visualization


TODO: 
* How graph structure is modelled?
* Performance
* UI customization
* Community 
* Language implemented
* Accessibility

## Subjective notes

These are notes I collected during hello world implementation

What I like:

* Good error messages when something goes wrong
* Decent set of algorithms implemented
* Central place for documentation
* Monorepo
* Decent label placement

What I don't like:

* Too much code to setup simple rendering.
* No documentation on using the library without bundlers (wasn't able to find how to do it)
* Documentation is outdated for some modules. E.g. https://github.com/graphology/graphology/tree/master/src/layout-forceatlas2
lists `forceAtlas2.assign(graph)` as a way to assign positions, but it actually will throw. 
* Zoom in and out is a bit slow (likely due to the labels rendering?)

