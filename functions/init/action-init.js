const initFiles = require('./helpers/init-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const jsonData = { baseName, name }
  const fileData = [{
    baseName,
    name,
    paths: ['action.yml', 'README.md', 'test/index.test.js', 'helpers/install-dependencies.js']
  }]
  const initData = { jsonData, fileData }
  initFiles(wd, initData)
}
