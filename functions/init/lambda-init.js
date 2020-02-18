const initFiles = require('./helpers/init-files.js')
const renameFiles = require('./helpers/rename-files.js')

module.exports = function lambdaInit (wd, baseName, name) {
  const jsonData = { baseName, name }
  const fileData = [{
    baseName,
    name,
    paths: ['README.md', 'serverless.yml']
  },
  {
    baseName: snakeToCamel(baseName),
    name: snakeToCamel(name),
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
