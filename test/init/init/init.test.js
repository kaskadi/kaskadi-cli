/* eslint-env mocha */
const init = require('../../../functions/init/init.js')
const elemInitTests = require('../element-init/tests.js')
const expectOut = require('../../expect-out.js')
const captOut = require('../../capt-out.js')
const copyData = require('../../copy-data.js')
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const root = 'test/init/init/'

describe('init test', () => {
  describe('should call initElement when passed element as argument', async () => {
    await copyData(`${root}element-init-data/data`, `${root}element-init-data/working-data`)
    process.chdir(`${root}element-init-data/working-data`)
    init(['element'])
    process.chdir('../../../../../')
    elemInitTests(`${root}element-init-data/`, 'kaskadi-template-element', 'working-data', 'KaskadiTemplateElement', 'WorkingData')
    rimraf.sync(`${root}element-init-data/working-data`)
  })
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
