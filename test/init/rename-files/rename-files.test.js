/* eslint-env mocha */
const renameFiles = require('../../../functions/init/helpers/rename-files.js')
const fs = require('fs')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const root = 'test/init/rename-files'
const dataPath = `${root}/data`
const workingDataPath = `${root}/working-data`

describe('rename-files helper', () => {
  const files = [
    {
      baseName: 'file-1',
      name: 'file-1-test'
    },
    {
      baseName: 'file-2',
      name: 'file-2-test'
    },
    {
      baseName: 'file-3',
      name: 'file-3-test'
    }
  ]
  before(async () => {
    await copyData(dataPath, workingDataPath)
    renameFiles(workingDataPath, files)
  })
  files.forEach(file => {
    it(`should rename ${file.baseName} to ${file.name}`, () => {
      const oldFileExists = fs.existsSync(`${workingDataPath}/${file.baseName}`)
      const newFileExists = fs.existsSync(`${workingDataPath}/${file.name}`)
      oldFileExists.should.equal(false)
      newFileExists.should.equal(true)
    })
  })
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
