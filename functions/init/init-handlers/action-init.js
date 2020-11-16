const initFiles = require('../helpers/init-files.js')

module.exports = function actionInit (wd, baseName, name) {
  const initData = [{
    baseName,
    name,
    paths: ['package.json', 'package-lock.json', 'action.yml', 'docs/template.md', 'test/action.test.js', 'src/pre.js']
  }]
  initFiles(wd, initData)
}
