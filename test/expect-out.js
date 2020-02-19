const defaultColors = require('../functions/init/default-colors.js')

module.exports = (colProp, type, msg, check) => {
  const col = defaultColors[colProp]
  return `${col}${type} ${defaultColors.RESET} ${msg} ${check ? defaultColors.COL2 : defaultColors.COL4}${check ? '✓' : 'x'}${defaultColors.RESET}`
}
