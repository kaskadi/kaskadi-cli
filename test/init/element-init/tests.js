/* eslint-env mocha */
const elementInit = require('../../../functions/init/init-handlers/element-init.js')
const fs = require('fs')
const deepEqual = require('deep-equal')
const chai = require('chai')
chai.should()

module.exports = (root, baseName, folderName, baseClassName, className) => {
  it(`should rename all occurences of ${baseName} to ${folderName} in docs/template.md`, () => {
    const file = fs.readFileSync(`${root}working-data/docs/template.md`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/docs/template.md`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in test/basic.test.js`, () => {
    const file = fs.readFileSync(`${root}working-data/test/basic.test.js`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/test/basic.test.js`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in example/index.html`, () => {
    const file = fs.readFileSync(`${root}working-data/example/index.html`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/example/index.html`, 'utf8').trim()
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
  describe(`should rename ${baseName}.js to ${folderName}.js and replace all occurences of ${baseName} and ${baseClassName}`, () => {
    it(`should rename ${baseName}.js to ${folderName}.js`, () => {
      const baseFile = fs.existsSync(`${root}working-data/${baseName}.js`)
      const newFile = fs.existsSync(`${root}working-data/${folderName}.js`)
      baseFile.should.equal(false)
      newFile.should.equal(true)
    })
    it(`should replace all occurences of ${baseName} and ${baseClassName} by ${folderName} and ${className}`, () => {
      const file = fs.readFileSync(`${root}working-data/${folderName}.js`, 'utf8').trim()
      const validationFile = fs.readFileSync(`${root}validation/${folderName}.js`, 'utf8').trim()
      file.should.equal(validationFile)
    })
  })
  it('should not throw on second run', () => {
    elementInit.should.not.throw(`${root}/working-data`, baseName, folderName)
  })
}
