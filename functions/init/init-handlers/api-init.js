const initFiles = require('../helpers/init-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'package-lock.json', 'README.md', 'serverless.yml', 'layer/nodejs/package.json']
  },
  {
    baseName: 'Template API',
    name: 'your API description here',
    paths: ['serverless.yml']
  }]
  initFiles(wd, initData)
}
