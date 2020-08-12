/* eslint-env mocha */
const layerInit = require('../../../functions/init/init-handlers/layer-init.js')
const fs = require('fs')
const deepEqual = require('deep-equal')
const chai = require('chai')
chai.should()

module.exports = (root, baseName, baseCamelName, folderName, camelName) => {
  it(`should rename all occurences of ${baseName} to ${folderName} in README.md`, () => {
    const file = fs.readFileSync(`${root}working-data/README.md`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/README.md`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} and ${baseCamelName} to ${folderName} and ${camelName} in serverless.yml`, () => {
    const file = fs.readFileSync(`${root}working-data/serverless.yml`, 'utf8').trim()
    const validationFile = fs.readFileSync(`${root}validation/serverless.yml`, 'utf8').trim()
    file.should.equal(validationFile)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    const pjson = JSON.parse(fs.readFileSync(`${root}working-data/package.json`, 'utf8'))
    const pjsonValid = JSON.parse(fs.readFileSync(`${root}validation/package.json`, 'utf8'))
    const test = deepEqual(pjson, pjsonValid)
    test.should.equal(true)
  })
  it('should not throw on second run', () => {
    layerInit.should.not.throw(`${root}working-data`, baseName, folderName)
  })
}
