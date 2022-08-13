## Cytoscape.js

https://js.cytoscape.org/


### What I like

* Many examples at https://js.cytoscape.org/#demos, decent documentation!
* Styling with selectors on graph looks very intriguing.
* Different layout types that I haven't heard about. Either a good (they invest into something new)
or a bad (they called old things new names) thing
* Allows to manipulate nodes/edges. Proper arrow rendering out of the box.
* Export to image format (`.png`, `.jpg`)
* Ability to perform layout on subgroup of nodes/edges

### What I don't like

* The desktop application UI is very confusing for the first time user
* The home page of cytoscape barely mentions cytoscape.js, hard to find a link to it from there
* Bad naming (`cy`, `eles`, `ele`, `ani` )
* Drops edges and nodes into the same bag of data (`elements`)
* Steals my right click events
* Awkward behavior when link has an id that is not made out of source/target.
* A bit inconsistent API: 
  - has `getElementById()`, but no `querySelector()`
  - has `selector` language, but has to augment API with functions like `successors, outgoers, incomers, predecessors, etc.`
* No vector export?