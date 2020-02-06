const elementInit = require('./element-init.js')
const actionInit = require('./action-init.js')
const apiInit = require('./api-init.js')
const lambdaInit = require('./lambda-init.js')
const defaultColors = require('./default-colors.js')
const log = require('./helpers/log.js')

module.exports = function init (args) {
  const opType = args[0]
  const wd = process.cwd()
  const name = wd.split('/')[wd.split('/').length - 1]
  let baseName = ''
  switch (opType) {
    case 'element':
      baseName = 'template-kaskadi-element'
      elementInit(wd, baseName, name)
      break
    case 'action':
      baseName = 'template-action'
      actionInit(wd, baseName, name)
      break
    case 'api':
      baseName = 'template-kaskadi-api'
      apiInit(wd, baseName, name)
      break
    case 'lambda':
      baseName = 'template-kaskadi-lambda'
      lambdaInit(wd, baseName, name)
      break
    default:
      log(defaultColors.COL4, 'error', 'no operation specified, aborting')
      break
  }
}
