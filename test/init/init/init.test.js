/* eslint-env mocha */
const init = require('../../../functions/init/init.js')
const elemInitTests = require('../element-init/tests.js')
const actionInitTests = require('../action-init/tests.js')
const apiInitTests = require('../api-init/tests.js')
const lambdaInitTests = require('../lambda-init/tests.js')
const layerInitTests = require('../layer-init/tests.js')
const expectOut = require('../../expect-out.js')
const captOut = require('../../capt-out.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const root = 'test/init/init/'

describe('init function', () => {
  describe('calls element-init when passed element as argument', () => {
    before(async () => {
      await copyData(`${root}element-init-data/data`, `${root}element-init-data/working-data`)
      process.chdir(`${root}element-init-data/working-data`)
      init(['element'])
      process.chdir('../../../../../')
    })
    elemInitTests(`${root}element-init-data/`, 'kaskadi-template-element', 'working-data', 'KaskadiTemplateElement', 'WorkingData')
    after(() => {
      rimraf.sync(`${root}element-init-data/working-data`)
    })
  })
  describe('calls action-init when passed action as argument', () => {
    before(async () => {
      await copyData(`${root}action-init-data/data`, `${root}action-init-data/working-data`)
      process.chdir(`${root}action-init-data/working-data`)
      init(['action'])
      process.chdir('../../../../../')
    })
    actionInitTests(`${root}action-init-data/`, 'template-action', 'working-data')
    after(() => {
      rimraf.sync(`${root}action-init-data/working-data`)
    })
  })
  describe('calls api-init when passed api as argument', () => {
    before(async () => {
      await copyData(`${root}api-init-data/data`, `${root}api-init-data/working-data`)
      process.chdir(`${root}api-init-data/working-data`)
      init(['api'])
      process.chdir('../../../../../')
    })
    apiInitTests(`${root}api-init-data/`, 'template-action', 'working-data')
    after(() => {
      rimraf.sync(`${root}api-init-data/working-data`)
    })
  })
  describe('calls lambda-init when passed lambda as argument', () => {
    before(async () => {
      await copyData(`${root}lambda-init-data/data`, `${root}lambda-init-data/working-data`)
      process.chdir(`${root}lambda-init-data/working-data`)
      init(['lambda'])
      process.chdir('../../../../../')
    })
    lambdaInitTests(`${root}lambda-init-data/`, 'template-kaskadi-lambda', 'TemplateKaskadi', 'working-data', 'WorkingData')
    after(() => {
      rimraf.sync(`${root}lambda-init-data/working-data`)
    })
  })
  describe('calls layer-init when passed layer as argument', () => {
    before(async () => {
      await copyData(`${root}layer-init-data/data`, `${root}layer-init-data/working-data`)
      process.chdir(`${root}layer-init-data/working-data`)
      init(['layer'])
      process.chdir('../../../../../')
    })
    layerInitTests(`${root}layer-init-data/`, 'template-kaskadi-layer', 'TemplateKaskadiLayer', 'working-data', 'WorkingData')
    after(() => {
      rimraf.sync(`${root}layer-init-data/working-data`)
    })
  })
  describe('does not perform any operation if passed an invalid argument', () => {
    it('should log an error message when passed an invalid argument', () => {
      const col = 'COL4'
      const type = 'error'
      const msg = 'no operation specified, aborting'
      const check = false
      const expectedOutput = expectOut(col, type, msg, check)
      const stdout = captOut(init, ['feioufjhweuiof'])
      stdout.should.equal(expectedOutput)
    })
  })
})
