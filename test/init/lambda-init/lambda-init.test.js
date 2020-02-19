/* eslint-env mocha */
const lambdaInit = require('../../../functions/init/lambda-init.js')
const fs = require('fs')
const copyData = require('../../copy-data.js')
const deepEqual = require('deep-equal')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const folderName = 'working-data'
const camelName = 'WorkingData'
const baseName = 'template-kaskadi-lambda'
const baseCamelName = 'TemplateKaskadi'

const root = 'test/init/lambda-init'
const dataPath = `${root}/data`
const workingDataPath = `${root}/${folderName}`

describe('lambda-init function test', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const wd = workingDataPath
    const name = wd.split('/')[wd.split('/').length - 1]
    lambdaInit(wd, baseName, name)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in README.md`, () => {
    const file = fs.readFileSync(`${workingDataPath}/README.md`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/README.md`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} and ${baseCamelName} to ${folderName} and ${camelName} in serverless.yml`, () => {
    const file = fs.readFileSync(`${workingDataPath}/serverless.yml`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/serverless.yml`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${workingDataPath}/package.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}/validation/package.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  it(`should rename ${baseName}.js to ${folderName}.js`, () => {
    const baseFile = fs.existsSync(`${workingDataPath}/${baseName}.js`)
    const newFile = fs.existsSync(`${workingDataPath}/${folderName}.js`)
    baseFile.should.equal(false)
    newFile.should.equal(true)
  })
  it('should not throw on second run', () => {
    const wd = workingDataPath
    const name = wd.split('/')[wd.split('/').length - 1]
    lambdaInit.should.not.throw(wd, baseName, name)
  })
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
