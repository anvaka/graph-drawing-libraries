# V2

This folder contains bunch of "hello world" examples using various libraries.

I'm trying to do highly subjective analysis of my own feelings when I use these libraries,
hoping to collect best/worst things from each library. 

In this document I'm going to capture notes for myself that are applicable to all libraries.

## Things I like

* Great documentation. Obviously. Libraries with amazing documentation and well structured demos
stand out. Some libraries burry their documentation too far behind marketing pages - not good.
I like two column layouts, similar to [cytoscape](https://js.cytoscape.org/) and 
[echarts](https://echarts.apache.org/examples/en/). Echarts to be honest likely has one the 
worst performance for graph layout, but their examples and documentation page are unparalleled.

Maybe I should turn v2 version into 2 column layout as well. Left panel has table of content with all individual
libraries at the root, and the right column provides more details? Also have a single topic for "at a glance"
comparison.

Actually, maybe https://vuejs.org/guide/introduction.html could serve as inspiration too? `Try it in the playground`
is very good.

## Things to watch out

* Many libraries initial setup is too verbose. Make default case trivial for developers.
* Zoom in/out is unbound - this is sloppy. Google maps doesn't let you zoom out Earth into a pixel,
why graph drawing libraries do it? There is no value.
* Ability to quickly import library into html page, without any bundlers. Let them use `module` too!

## Things to test for each library

* Accessibility
* How graph structure is modelled?
* Performance
* UI customization
* Community 
* Language implemented