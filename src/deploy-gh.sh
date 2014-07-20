#!/bin/bash
rm -rf dist || exit 0;
mkdir dist;
gulp build
( cd dist
 git init
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@github.com/anvaka/graph-drawing-libraries" master:gh-pages > /dev/null 2>&1
)
