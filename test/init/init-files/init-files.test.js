/* eslint-env mocha */
const initFiles = require('../../../functions/init/helpers/init-files.js')
const copyData = require('../../copy-data.js')
const fs = require('fs')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const root = 'test/init/init-files'
const dataPath = `${root}/data`
const workingDataPath = `${root}/working-data`

const oldName = 'old-name'
const newName = 'new-name'

const initData = [
  {
    baseName: oldName,
    name: newName,
    paths: ['package.json', 'test', 'test2']
  }
]

describe('init-files helper', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    initFiles(workingDataPath, initData)
  })
  for (const data of initData) {
    for (const path of data.paths) {
      it(`should replace ${oldName} by ${newName} in ${path}`, () => {
        const file = fs.readFileSync(`${workingDataPath}/${path}`, 'utf8').trim()
        const validationFile = fs.readFileSync(`${root}/validation/${path}`, 'utf8').trim()
        file.should.equal(validationFile)
      })
    }
  }
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
