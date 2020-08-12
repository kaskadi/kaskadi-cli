/* eslint-env mocha */
const elementInit = require('../../../functions/init/init-handlers/element-init.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const tests = require('./tests.js')

const folderName = 'working-data'
const className = 'WorkingData'
const baseName = 'template-kaskadi-element'
const baseClassName = 'TemplateKaskadiElement'

const root = 'test/init/element-init/'
const dataPath = `${root}data`
const workingDataPath = `${root}${folderName}`

describe('element-init function', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const name = workingDataPath.split('/')[workingDataPath.split('/').length - 1]
    elementInit(workingDataPath, baseName, name)
  })
  tests(root, baseName, folderName, baseClassName, className)
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
