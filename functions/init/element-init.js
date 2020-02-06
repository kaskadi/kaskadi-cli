const fs = require('fs')
const defaultColors = require('./default-colors.js')
const helpers = require('./helpers.js')
module.exports = function init () {
  const wd = process.cwd().split('/')
  const name = wd[wd.length - 1]
  const baseName = 'template-kaskadi-element'
  helpers.updatePackageJSON(baseName, name)
  helpers.replaceNameInFile(process.cwd() + '/test/basic.test.js', baseName, name)
  helpers.replaceNameInFile(process.cwd() + '/README.md', baseName, name)
  helpers.replaceNameInFile(process.cwd() + '/example/index.html', baseName, name)
  helpers.replaceNameInFile(`${process.cwd()}/${baseName}.js`, baseName, name)
  helpers.replaceNameInFile(`${process.cwd()}/${baseName}.js`, helpers.snakeToCamel(baseName), helpers.snakeToCamel(name))
  if (fs.existsSync(`${baseName}.js`)) {
    fs.renameSync(`${baseName}.js`, name + '.js')
  } else {
    helpers.log(defaultColors.COL4, 'error', `${baseName}.js not found`, false)
  }
  helpers.log(defaultColors.COL1, 'rename', `${baseName}.js to ${defaultColors.COL3}${name}.js`, true)
}
