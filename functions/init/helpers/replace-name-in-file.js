const fs = require('fs')
const defaultColors = require('../default-colors.js')
const log = require('./log.js')
const updateNotice = require('./update-notice.js')

module.exports = function replaceNameInFile (fileName, oldName, newName) {
  const oldNameRegex = new RegExp(oldName, 'g')
  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName, 'utf8')
    fs.writeFileSync(fileName, file.replace(oldNameRegex, newName), 'utf8')
    updateNotice(fileName)
  } else {
    log(defaultColors.COL4, 'error', `${fileName} not found`, false)
  }
}
