const defaultColors = require('../default-colors.js')
const log = require('./log.js')

module.exports = function updateNotice (name) {
  log(defaultColors.COL1, 'updated', name, true)
}
