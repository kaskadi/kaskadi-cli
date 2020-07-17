#!/usr/bin/env node

const functions = {
  init: require('./functions/init/init.js'),
  render: require('./functions/render.js'),
  version: require('./functions/version.js')
}

functions[process.argv[2]](process.argv.splice(3))
