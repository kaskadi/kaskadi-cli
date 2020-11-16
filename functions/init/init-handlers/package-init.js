const initFiles = require('../helpers/init-files.js')

module.exports = function lambdaInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'package-lock.json', 'docs/template.md']
  }]
  initFiles(wd, initData)
}
