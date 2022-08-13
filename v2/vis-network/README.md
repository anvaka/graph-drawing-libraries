## visjs/vis-network

https://github.com/visjs/vis-network

Document below is work in progress.

## Architecture

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

* Very easy to get started
* Supports in-browser cdn distribution out of the box
* Physical edges as ropes simulation
* Good amount of simple examples https://visjs.github.io/vis-network/examples/

What I don't like:

* Can take a while to compute even a simple layout.
* Not much separation of concerns in the code. The library is mostly for rendering 2D graphs, with a lot of hardcoded assumptions about visual node representation. While code is easy to read and well documented, compared to sigma.js this library is likely going to be harder to extend. E.g. [LayoutEngine](https://github.com/visjs/vis-network/blob/24ce98c980370f3d23f4eef7850734f08f8bbf62/lib/network/modules/LayoutEngine.js) with ~1800 lines of code.

