/* eslint-env mocha */
const actionInit = require('../../../functions/init/action-init.js')
const fs = require('fs')
const copyData = require('../../copy-data.js')
const deepEqual = require('deep-equal')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const folderName = 'working-data'
const baseName = 'template-action'

const root = 'test/init/action-init'
const dataPath = `${root}/data`
const workingDataPath = `${root}/${folderName}`

describe('action-init function test', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const wd = workingDataPath
    const name = wd.split('/')[wd.split('/').length - 1]
    actionInit(wd, baseName, name)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in README.md`, () => {
    const file = fs.readFileSync(`${workingDataPath}/README.md`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/README.md`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in action.yml`, () => {
    const file = fs.readFileSync(`${workingDataPath}/action.yml`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/action.yml`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${workingDataPath}/package.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}/validation/package.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  it('should not throw on second run', () => {
    const wd = workingDataPath
    const name = wd.split('/')[wd.split('/').length - 1]
    actionInit.should.not.throw(wd, baseName, name)
  })
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
