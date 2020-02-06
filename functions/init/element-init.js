const fs = require('fs')
const defaultColors = require('./default-colors.js')
const initFiles = require('./helpers/init-files.js')
const snakeToCamel = require('./helpers/snake-to-camel.js')
const log = require('./helpers/log.js')

module.exports = function elementInit (wd, baseName, name) {
  const json = {
    baseName,
    name
  }
  const files = [
    {
      baseName,
      name,
      paths: ['test/basic.test.js', 'README.md', 'example/index.html', `${baseName}.js`]
    },
    {
      baseName: snakeToCamel(baseName),
      name: snakeToCamel(name),
      paths: [`${baseName}.js`]
    }
  ]
  const initData = {
    json,
    files
  }
  initFiles(wd, initData)
  if (fs.existsSync(`${baseName}.js`)) {
    fs.renameSync(`${baseName}.js`, name + '.js')
  } else {
    log(defaultColors.COL4, 'error', `${baseName}.js not found`, false)
  }
  log(defaultColors.COL1, 'rename', `${baseName}.js to ${defaultColors.COL1}${name}.js`, true)
}
