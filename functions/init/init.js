const opTypeData = {
  element: {
    baseName: 'template-kaskadi-element',
    handler: require('./init-handlers/element-init.js')
  },
  action: {
    baseName: 'template-action',
    handler: require('./init-handlers/action-init.js')
  },
  api: {
    baseName: 'template-kaskadi-api',
    handler: require('./init-handlers/api-init.js')
  },
  lambda: {
    baseName: 'template-kaskadi-lambda',
    handler: require('./init-handlers/lambda-init.js')
  },
  layer: {
    baseName: 'template-kaskadi-layer',
    handler: require('./init-handlers/layer-init.js')
  }
}

module.exports = (opType, program) => {
  const wd = process.cwd()
  const name = wd.split('/')[wd.split('/').length - 1]
  if (!opTypeData[opType]) {
    require('./helpers/log.js')(require('./default-colors.js').COL4, 'error', `Invalid operation (type: ${opType}) specified, aborting...`)
  } else {
    opTypeData[opType].handler(wd, opTypeData[opType].baseName, name)
  }
}
