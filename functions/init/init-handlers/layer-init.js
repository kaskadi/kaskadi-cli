const initFiles = require('../helpers/init-files.js')
const snakeToCamel = require('../helpers/snake-to-camel.js')

module.exports = function lambdaInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'README.md', 'serverless.yml']
  },
  {
    baseName: snakeToCamel(baseName),
    name: snakeToCamel(name),
    paths: ['serverless.yml']
  }]
  initFiles(wd, initData)
}
