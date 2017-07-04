#!/usr/bin/env bash

# To be run from repo root directory.

set -eux

rm -rf dist/ && mkdir dist

cp -r lambda/runner.js phantomjs.binary node_modules dist

cd dist
zip -r runner.zip *