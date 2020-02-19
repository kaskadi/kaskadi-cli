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
        file.should.equal(newName)
      })
    })
  })
  describe(`should rename all occurences of ${oldName} to ${newName} in package.json`, () => {
    let pjson
    before(() => {
      const file = fs.readFileSync(`${workingDataPath}/package.json`, 'utf8')
      pjson = JSON.parse(file)
    })
    it(`should rename package name to ${newName}`, () => {
      pjson.name.should.equal(newName)
    })
    it(`should replace ${oldName} occurences in package description by ${newName}`, () => {
      pjson.description.should.equal(`${newName} is a test`)
    })
    it(`should replace ${oldName} occurences in package main by ${newName}`, () => {
      pjson.main.should.equal(`${newName}.js`)
    })
    it(`should replace ${oldName} occurences in package exec script by ${newName}`, () => {
      pjson.scripts.exec.should.equal(`node ${newName}`)
    })
    it(`should replace ${oldName} occurences in package repository url by ${newName}`, () => {
      pjson.repository.url.should.equal(`git+https://github.com/kaskadi/${newName}.git`)
    })
    it(`should replace ${oldName} occurences in package bugs url by ${newName}`, () => {
      pjson.bugs.url.should.equal(`https://github.com/kaskadi/${newName}/issues`)
    })
    it(`should replace ${oldName} occurences in package homepage by ${newName}`, () => {
      pjson.homepage.should.equal(`https://github.com/kaskadi/${newName}#readme`)
    })
  })
  after(() => {
    rimraf.sync(workingDataPath)
  })
})
