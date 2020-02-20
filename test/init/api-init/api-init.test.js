/* eslint-env mocha */
const apiInit = require('../../../functions/init/api-init.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const tests = require('./tests.js')

const folderName = 'working-data'
const baseName = 'template-kaskadi-api'

const root = 'test/init/api-init/'
const dataPath = `${root}data`
const workingDataPath = `${root}${folderName}`

describe('api-init function', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const name = workingDataPath.split('/')[workingDataPath.split('/').length - 1]
    apiInit(workingDataPath, baseName, name)
  })
  tests(root, baseName, folderName)
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
