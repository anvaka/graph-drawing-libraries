## cosmograph-org/cosmos

https://github.com/cosmograph-org/cosmos

## Subjective notes

These are notes I collected during hello world implementation

What I like:

* Performance looks very promising: https://www.youtube.com/watch?v=HWk78hP8aEE
* Written in TypeScript. Easier to read the code with types annotations.
* Uses regl for WebGL. I like regl.

What I don't like:

* License. I don't like the way it looks (Creative Commons Attribution-NonCommercial 4.0 International Public License)
* No unit tests.
* Documentation is very limited. Had to read the source code to put all together.
* Laptop gets hot
* Not all GPUs support EXT_float_blend extension, make it unusable on some devices (e.g. iOS 15.4+)
* Cannot import from cdn, this gives an error:

``` js
  <script type='module' src='https://cdn.jsdelivr.net/npm/@cosmograph/cosmos@1.0.0/dist/index.min.js'></script>
```

