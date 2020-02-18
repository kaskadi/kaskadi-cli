const initFiles = require('./helpers/init-files.js')
const renameFiles = require('./helpers/rename-files.js')
const snakeToCamel = require('./helpers/snake-to-camel.js')

module.exports = function lambdaInit (wd, baseName, name) {
  const jsonData = { baseName, name }
  const fileData = [{
    baseName,
    name,
    paths: ['README.md', 'serverless.yml']
  },
  {
    baseName: snakeToCamel(baseName.replace('-lambda', '')),
    name: snakeToCamel(name.replace('-lambda', '')),
    paths: ['serverless.yml']
  }]
  const initData = { jsonData, fileData }
  initFiles(wd, initData)
  const files = [{
    baseName: `${baseName}.js`,
    name: `${name}.js`
  }]
  renameFiles(wd, files)
}
