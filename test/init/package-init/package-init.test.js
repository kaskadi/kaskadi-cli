/* eslint-env mocha */
const pkgInit = require('../../../functions/init/init-handlers/package-init.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const tests = require('./tests.js')

const folderName = 'working-data'
const baseName = 'template-npm-pkg'

const root = 'test/init/package-init/'
const dataPath = `${root}data`
const workingDataPath = `${root}${folderName}`

describe('package-init function', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const name = workingDataPath.split('/')[workingDataPath.split('/').length - 1]
    pkgInit(workingDataPath, baseName, name)
  })
  tests(root, baseName, folderName)
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
