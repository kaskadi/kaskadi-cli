/* eslint-env mocha */
const actionInit = require('../../../functions/init/init-handlers/action-init.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const tests = require('./tests.js')

const folderName = 'working-data'
const baseName = 'template-action'

const root = 'test/init/action-init/'
const dataPath = `${root}data`
const workingDataPath = `${root}${folderName}`

describe('action-init function', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const name = workingDataPath.split('/')[workingDataPath.split('/').length - 1]
    actionInit(workingDataPath, baseName, name)
  })
  tests(root, baseName, folderName)
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
