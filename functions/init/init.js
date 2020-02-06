const elementInit = require('./element-init.js')
const defaultColors = require('./default-colors.js')
const log = require('./helpers/log.js')

module.exports = function init (args) {
  const opType = args[0]
  switch (opType) {
    case 'element':
      elementInit()
      break
    default:
      log(defaultColors.COL4, 'error', 'no operation specified, aborting')
      break
  }
}
