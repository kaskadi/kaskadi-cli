const initFiles = require('../helpers/init-files.js')
const renameFiles = require('../helpers/rename-files.js')
const snakeToCamel = require('../helpers/snake-to-camel.js')

module.exports = function lambdaInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'package-lock.json', 'docs/template.md', 'serverless.yml', 'layer/nodejs/package.json', 'layer/nodejs/package-lock.json']
  },
  {
    baseName: snakeToCamel(baseName.replace('-lambda', '')),
    name: snakeToCamel(name.replace('-lambda', '')),
    paths: ['serverless.yml']
  }]
  initFiles(wd, initData)
  const files = [{
    baseName: `${baseName}.js`,
    name: `${name}.js`
  },
  {
    baseName: `layer/nodejs/${baseName}-utils`,
    name: `layer/nodejs/${name}-utils`
  }]
  renameFiles(wd, files)
}
