/* eslint-env mocha */
const initFiles = require('../../../functions/init/helpers/init-files.js')
const copyData = require('../../copy-data.js')
const deepEqual = require('deep-equal')
const fs = require('fs')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const root = 'test/init/init-files'
const dataPath = `${root}/data`
const workingDataPath = `${root}/working-data`

const oldName = 'old-name'
const newName = 'new-name'

const jsonData = {
  baseName: oldName,
  name: newName
}
const fileData = [
  {
    baseName: oldName,
    name: newName,
    paths: ['test', 'test2']
  }
]

describe('init-files helper', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const initData = {
      jsonData,
      fileData
    }
    initFiles(workingDataPath, initData)
  })
  fileData.forEach(data => {
    data.paths.forEach(path => {
      it(`should replace ${oldName} by ${newName} in ${path}`, () => {
        const file = fs.readFileSync(`${workingDataPath}/${path}`, 'utf8').trim()
        const validationFile = fs.readFileSync(`${root}/validation/${path}`, 'utf8').trim()
        file.should.equal(validationFile)
      })
    })
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
