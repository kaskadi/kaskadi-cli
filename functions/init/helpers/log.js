const defaultColors = require('../default-colors.js')

module.exports = function log (col, type, msg, check) {
  console.log(`${col}${type} ${defaultColors.RESET} ${msg} ${check ? defaultColors.COL2 : defaultColors.COL4}${check ? '✓' : 'x'}${defaultColors.RESET} `)
}
