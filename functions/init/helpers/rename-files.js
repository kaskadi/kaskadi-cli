const fs = require('fs')
const defaultColors = require('../default-colors.js')
const log = require('./log.js')

module.exports = function renameFiles (wd, files) {
  files.forEach(file => {
    if (fs.existsSync(`${wd}/${file.baseName}`)) {
      fs.renameSync(`${wd}/${file.baseName}`, `${wd}/${file.name}`)
      log(defaultColors.COL1, 'rename', `${file.baseName} to ${defaultColors.COL1}${file.name}`, true)
    } else {
      log(defaultColors.COL4, 'error', `${file.baseName} not found`, false)
    }
  })
}
