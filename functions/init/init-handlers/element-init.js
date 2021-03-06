const initFiles = require('../helpers/init-files.js')
const renameFiles = require('../helpers/rename-files.js')
const snakeToCamel = require('../helpers/snake-to-camel.js')

module.exports = function elementInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'package-lock.json', 'test/basic.test.js', 'docs/template.md', 'example/index.html', `${baseName}.js`]
  },
  {
    baseName: snakeToCamel(baseName),
    name: snakeToCamel(name),
    paths: [`${baseName}.js`]
  }]
  initFiles(wd, initData)
  const files = [{
    baseName: `${baseName}.js`,
    name: `${name}.js`
  }]
  renameFiles(wd, files)
}
