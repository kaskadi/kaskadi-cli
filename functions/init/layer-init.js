const initFiles = require('./helpers/init-files.js')
const snakeToCamel = require('./helpers/snake-to-camel.js')

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
}
