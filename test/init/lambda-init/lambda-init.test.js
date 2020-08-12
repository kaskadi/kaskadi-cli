/* eslint-env mocha */
const lambdaInit = require('../../../functions/init/init-handlers/lambda-init.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const tests = require('./tests.js')

const folderName = 'working-data'
const camelName = 'WorkingData'
const baseName = 'template-kaskadi-lambda'
const baseCamelName = 'TemplateKaskadi'

const root = 'test/init/lambda-init/'
const dataPath = `${root}data`
const workingDataPath = `${root}${folderName}`

describe('lambda-init function', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const name = workingDataPath.split('/')[workingDataPath.split('/').length - 1]
    lambdaInit(workingDataPath, baseName, name)
  })
  tests(root, baseName, baseCamelName, folderName, camelName)
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
