/* eslint-env mocha */
const actionInit = require('../../../functions/init/init-handlers/action-init.js')
const fs = require('fs')
const deepEqual = require('deep-equal')
const chai = require('chai')
chai.should()

module.exports = (root, baseName, folderName) => {
  it(`should rename all occurences of ${baseName} to ${folderName} in docs/template.md`, () => {
    const file = fs.readFileSync(`${root}working-data/docs/template.md`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/docs/template.md`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in action.yml`, () => {
    const file = fs.readFileSync(`${root}working-data/action.yml`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/action.yml`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in test/action.test.js`, () => {
    const file = fs.readFileSync(`${root}working-data/test/action.test.js`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/test/action.test.js`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${root}working-data/package.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}validation/package.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in package-lock.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${root}working-data/package-lock.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}validation/package-lock.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in src/pre.js`, () => {
    const pjson = fs.readFileSync(`${root}working-data/src/pre.js`, 'utf8')
    const pjsonValid = fs.readFileSync(`${root}validation/src/pre.js`, 'utf8')
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  it('should not throw on second run', () => {
    actionInit.should.not.throw(`${root}working-data`, baseName, folderName)
  })
}
