/* eslint-env mocha */
const elementInit = require('../../../functions/init/element-init.js')
const fs = require('fs')
const copyData = require('../../copy-data.js')
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
    file.should.equal(folderName)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in test/basic.test.js`, () => {
    const file = fs.readFileSync(`${workingDataPath}/test/basic.test.js`, 'utf8').trim()
    file.should.equal(folderName)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in example/index.html`, () => {
    const file = fs.readFileSync(`${workingDataPath}/example/index.html`, 'utf8').trim()
    file.should.equal(folderName)
  })
  describe(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    let pjson
    before(() => {
      const file = fs.readFileSync(`${workingDataPath}/package.json`, 'utf8')
      pjson = JSON.parse(file)
    })
    it(`should rename package name to @kaskadi/${folderName}`, () => {
      pjson.name.should.equal(`@kaskadi/${folderName}`)
    })
    it(`should rename package main file to ${folderName}.js`, () => {
      pjson.main.should.equal(`${folderName}.js`)
    })
    it(`should rename repository url to git+https://github.com/kaskadi/${folderName}.git`, () => {
      pjson.repository.url.should.equal(`git+https://github.com/kaskadi/${folderName}.git`)
    })
    it(`should rename repository issues url to https://github.com/kaskadi/${folderName}/issues`, () => {
      pjson.bugs.url.should.equal(`https://github.com/kaskadi/${folderName}/issues`)
    })
    it(`should rename homepage url to https://github.com/kaskadi/${folderName}#readme`, () => {
      pjson.homepage.should.equal(`https://github.com/kaskadi/${folderName}#readme`)
    })
    it(`should rename 1st file source to ${folderName}.js`, () => {
      pjson.kaskadi['s3-push'].files[0].src.should.equal(`${folderName}.js`)
    })
    it(`should rename 1st file destination to modules/@kaskadi/${folderName}/{branch}${folderName}.js`, () => {
      pjson.kaskadi['s3-push'].files[0].dest.should.equal(`modules/@kaskadi/${folderName}/{branch}${folderName}.js`)
    })
    it(`should rename 2nd file destination to modules/@kaskadi/${folderName}/{branch}example/index.html`, () => {
      pjson.kaskadi['s3-push'].files[1].dest.should.equal(`modules/@kaskadi/${folderName}/{branch}example/index.html`)
    })
  })
  describe(`should rename ${baseName}.js to ${folderName}.js and replace all occurences of ${baseName} and ${baseClassName}`, () => {
    it(`should rename ${baseName}.js to ${folderName}.js`, () => {
      const baseFile = fs.existsSync(`${workingDataPath}/${baseName}.js`)
      const newFile = fs.existsSync(`${workingDataPath}/${folderName}.js`)
      baseFile.should.equal(false)
      newFile.should.equal(true)
    })
    it(`should replace all occurences ${baseName} by ${folderName}`, () => {
      const file = fs.readFileSync(`${workingDataPath}/${folderName}.js`, 'utf8')
      const files = file.split('\n')
      files[0].should.equal(folderName)
    })
    it(`should replace all occurences ${baseClassName} by ${className}`, () => {
      const file = fs.readFileSync(`${workingDataPath}/${folderName}.js`, 'utf8')
      const files = file.split('\n')
      files[1].should.equal(className)
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
