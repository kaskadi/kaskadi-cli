/* eslint-env mocha */
const replaceNameInFile = require('../../../functions/init/helpers/replace-name-in-file.js')
const expectOut = require('../../expect-out.js')
const captOut = require('../../capt-out.js')
const copyData = require('../../copy-data.js')
const fs = require('fs')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const root = 'test/init/replace-name-in-file'
const dataPath = `${root}/data`
const workingDataPath = `${root}/working-data`

const fileName = 'test'
const oldName = 'old-name'
const newName = 'new-name'

describe('replace-name-in-file helper', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    replaceNameInFile(`${workingDataPath}/${fileName}`, oldName, newName)
  })
  it(`should replace ${oldName} by ${newName} in ${fileName}`, () => {
    const file = fs.readFileSync(`${workingDataPath}/${fileName}`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/${fileName}`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it('should log an error message if the file is not found', () => {
    const notFoundFile = `${workingDataPath}/hello`
    const expectedOutput = expectOut('COL4', 'error', `${notFoundFile} not found`, false)
    const stdout = captOut(replaceNameInFile, notFoundFile, oldName, newName)
    stdout.should.equal(expectedOutput)
  })
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
