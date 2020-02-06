const initFiles = require('./helpers/init-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const jsonData = { baseName, name }
  const fileData = [{
    baseName,
    name,
    paths: ['README.md', 'serverless.yml']
  },
  {
    baseName: 'Template API',
    name: '# your API description here',
    paths: ['serverless.yml']
  }]
  const initData = { jsonData, fileData }
  initFiles(wd, initData)
}
