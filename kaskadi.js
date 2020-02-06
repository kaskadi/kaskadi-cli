#!/usr/bin/env node

// const readline = require('readline');
// function askQuestion(query) {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//
//     return new Promise(resolve => rl.question(query, ans => {
//         rl.close();
//         resolve(ans);
//     }))
// }

// TODO: add init for each type of template and extend function collection here

const functions = {
  'element-init': require('./functions/init/element-init.js'),
  render: require('./functions/render.js'),
  version: require('./functions/version.js')
}

functions[process.argv[2]](process.argv.splice(3))
