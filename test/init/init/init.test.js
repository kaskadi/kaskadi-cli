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
const initRoot = 'test/init/'

describe('init function', () => {
  describe('calls element-init when passed element as argument', () => {
    before(async () => {
      await beforeHandler('element')
    })
    elemInitTests(root, 'kaskadi-template-element', 'working-data', 'KaskadiTemplateElement', 'WorkingData')
    after(afterHandler)
  })
  describe('calls action-init when passed action as argument', () => {
    before(async () => {
      await beforeHandler('action')
    })
    actionInitTests(root, 'template-action', 'working-data')
    after(afterHandler)
  })
  describe('calls api-init when passed api as argument', () => {
    before(async () => {
      await beforeHandler('api')
    })
    apiInitTests(root, 'template-action', 'working-data')
    after(afterHandler)
  })
  describe('calls lambda-init when passed lambda as argument', () => {
    before(async () => {
      await beforeHandler('lambda')
    })
    lambdaInitTests(root, 'template-kaskadi-lambda', 'TemplateKaskadi', 'working-data', 'WorkingData')
    after(afterHandler)
  })
  describe('calls layer-init when passed layer as argument', () => {
    before(async () => {
      await beforeHandler('layer')
    })
    layerInitTests(root, 'template-kaskadi-layer', 'TemplateKaskadiLayer', 'working-data', 'WorkingData')
    after(afterHandler)
  })
  describe('does not perform any operation if passed an invalid argument', () => {
    it('should log an error message when passed an invalid argument', () => {
      const col = 'COL4'
      const type = 'error'
      const msg = 'No operation specified, aborting...'
      const check = false
      const expectedOutput = expectOut(col, type, msg, check)
      const stdout = captOut(init, ['feioufjhweuiof'])
      stdout.should.equal(expectedOutput)
    })
  })
})

async function beforeHandler (type) {
  await copyData(`${initRoot}${type}-init/data`, `${root}data`)
  await copyData(`${initRoot}${type}-init/validation`, `${root}validation`)
  await copyData(`${root}data`, `${root}working-data`)
  process.chdir(`${root}working-data`)
  init([type])
  const repo = `${root}working-data`.split('/').filter(folder => folder).map(folder => '..').join('/') + '/'
  process.chdir(repo)
}

function afterHandler () {
  rimraf.sync(`${root}data`)
  rimraf.sync(`${root}validation`)
  rimraf.sync(`${root}working-data`)
}
