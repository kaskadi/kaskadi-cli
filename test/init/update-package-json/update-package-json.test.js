/* eslint-env mocha */
const updatePackageJson = require('../../../functions/init/helpers/update-package-json.js')
const copyData = require('../../copy-data.js')
const deepEqual = require('deep-equal')
const fs = require('fs')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const root = 'test/init/update-package-json'
const dataPath = `${root}/data`
const workingDataPath = `${root}/working-data`

const oldName = 'old-name'
const newName = 'new-name'

describe('update-package-json helper', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    updatePackageJson(workingDataPath, oldName, newName)
  })
  it(`should rename all occurences of ${oldName} to ${newName} in package.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${workingDataPath}/package.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}/validation/package.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
