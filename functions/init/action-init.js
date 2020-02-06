const initFiles = require('./helpers/init-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const jsonData = {
    baseName,
    name
  }
  const fileData = [
    {
      baseName,
      name,
      paths: ['action.yml', 'README.md']
    }
  ]
  const initData = {
    jsonData,
    fileData
  }
  initFiles(wd, initData)
}
