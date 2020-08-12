const initFiles = require('../helpers/init-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'action.yml', 'README.md', 'test/index.test.js', 'helpers/install-dependencies.js']
  }]
  initFiles(wd, initData)
}
