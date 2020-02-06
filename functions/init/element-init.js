const fs = require('fs')
const defaultColors = require('./default-colors.js')
const updatePackageJSON = require('./helpers/update-package-json.js')
const replaceNameInFile = require('./helpers/replace-name-in-file.js')
const snakeToCamel = require('./helpers/snake-to-camel.js')
const log = require('./helpers/log.js')

module.exports = function elementInit () {
  const wd = process.cwd().split('/')
  const name = wd[wd.length - 1]
  const baseName = 'template-kaskadi-element'
  updatePackageJSON(baseName, name)
  replaceNameInFile(process.cwd() + '/test/basic.test.js', baseName, name)
  replaceNameInFile(process.cwd() + '/README.md', baseName, name)
  replaceNameInFile(process.cwd() + '/example/index.html', baseName, name)
  replaceNameInFile(`${process.cwd()}/${baseName}.js`, baseName, name)
  replaceNameInFile(`${process.cwd()}/${baseName}.js`, snakeToCamel(baseName), snakeToCamel(name))
  if (fs.existsSync(`${baseName}.js`)) {
    fs.renameSync(`${baseName}.js`, name + '.js')
  } else {
    log(defaultColors.COL4, 'error', `${baseName}.js not found`, false)
  }
  log(defaultColors.COL1, 'rename', `${baseName}.js to ${defaultColors.COL1}${name}.js`, true)
}
