/* eslint-env mocha */
const elementInit = require('../../../functions/init/element-init.js')
const fs = require('fs')
const copyData = require('../../copy-data.js')
const deepEqual = require('deep-equal')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const folderName = 'working-data'
const className = 'WorkingData'
const baseName = 'template-kaskadi-element'
const baseClassName = 'TemplateKaskadiElement'

const root = 'test/init/element-init'
const dataPath = `${root}/data`
const workingDataPath = `${root}/${folderName}`

describe('#elementInit()', () => {
  before(async () => {
    await copyData(dataPath, workingDataPath)
    const wd = workingDataPath
    const name = wd.split('/')[wd.split('/').length - 1]
    elementInit(wd, baseName, name)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in README.md`, () => {
    const file = fs.readFileSync(`${workingDataPath}/README.md`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/README.md`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in test/basic.test.js`, () => {
    const file = fs.readFileSync(`${workingDataPath}/test/basic.test.js`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/test/basic.test.js`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in example/index.html`, () => {
    const file = fs.readFileSync(`${workingDataPath}/example/index.html`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}/validation/example/index.html`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${workingDataPath}/package.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}/validation/package.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  describe(`should rename ${baseName}.js to ${folderName}.js and replace all occurences of ${baseName} and ${baseClassName}`, () => {
    it(`should rename ${baseName}.js to ${folderName}.js`, () => {
      const baseFile = fs.existsSync(`${workingDataPath}/${baseName}.js`)
      const newFile = fs.existsSync(`${workingDataPath}/${folderName}.js`)
      baseFile.should.equal(false)
      newFile.should.equal(true)
    })
    it(`should replace all occurences of ${baseName} and ${baseClassName} by ${folderName} and ${className}`, () => {
      const file = fs.readFileSync(`${workingDataPath}/${folderName}.js`, 'utf8').trim()
      const validationFile = fs.readFileSync(`${root}/validation/${folderName}.js`, 'utf8').trim()
      file.should.equal(validationFile)
    })
    it('should not throw on second run', () => {
      const wd = workingDataPath
      const name = wd.split('/')[wd.split('/').length - 1]
      elementInit.should.not.throw(wd, baseName, name)
    })
  })
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
