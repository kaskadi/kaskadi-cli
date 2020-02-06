const initFiles = require('./helpers/init-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const json = {
    baseName,
    name
  }
  const files = {
    baseName,
    name,
    paths: ['action.yml', 'README.md']
  }
  const initData = {
    json,
    files
  }
  initFiles(wd, initData)
}
