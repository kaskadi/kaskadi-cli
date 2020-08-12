/* eslint-env mocha */
const layerInit = require('../../../functions/init/init-handlers/layer-init.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const tests = require('./tests.js')

const folderName = 'working-data'
const camelName = 'WorkingData'
const baseName = 'template-kaskadi-layer'
const baseCamelName = 'TemplateKaskadiLayer'

const root = 'test/init/layer-init/'
const dataPath = `${root}data`
const workingDataPath = `${root}${folderName}`

describe('layer-init function', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const name = workingDataPath.split('/')[workingDataPath.split('/').length - 1]
    layerInit(workingDataPath, baseName, name)
  })
  tests(root, baseName, baseCamelName, folderName, camelName)
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
