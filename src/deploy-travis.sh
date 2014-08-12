#!/bin/bash
rm -rf dist || exit 0;
mkdir dist;
gulp build
( cd dist
 git init
 git config user.name "anvaka"
 git config user.email "anvaka@gmail.com"
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
