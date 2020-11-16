const initFiles = require('../helpers/init-files.js')
const renameFiles = require('../helpers/rename-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'package-lock.json', 'docs/template.md', 'serverless.yml', 'layer/nodejs/package.json', 'layer/nodejs/package-lock.json']
  },
  {
    baseName: 'Template API',
    name: 'your API description here',
    paths: ['serverless.yml']
  }]
  initFiles(wd, initData)
  const files = [{
    baseName: `layer/nodejs/${baseName}-utils`,
    name: `layer/nodejs/${name}-utils`
  }]
  renameFiles(wd, files)
}
