var pseudoloc = require("../index");

console.log(JSON.stringify({
  "name": "pseudoloc",
  "version": pseudoloc.version,
  "description": "Simple pseudoloc (psuedolocalization) for strings",
  "keywords": ["localization", "psuedoloc"],
  "author": "BunKat <bill@bunkat.com>",
  "repository" : {
    "type" : "git",
    "url" : "git://github.com/bunkat/pseudoloc.git"
  },
  "main": "index.js",
  "browserify": "index-browserify.js",
  "jam": {
    "main": "psuedoloc.js",
    "shim": {
      "exports": "pseudoloc"
    }
  },
  "dependencies": {
    "commander": "*"
  },
  "devDependencies": {
    "smash": "~0.0.8",
    "mocha": "*",
    "should": ">=0.6.3",
    "jslint": "*",
    "uglify-js": "*",
    "benchmark": "*"
  },
  "license": "MIT",
  "scripts": {
    "test": "./node_modules/.bin/mocha test/**/*-test.js"
  }
}, null, 2));