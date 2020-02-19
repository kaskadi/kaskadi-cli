/* eslint-env mocha */
const log = require('../../../functions/init/helpers/log.js')
const defaultColors = require('../../../functions/init/default-colors.js')
const expectOut = require('../../expect-out.js')
const captOut = require('../../capt-out.js')
const chai = require('chai')
chai.should()

describe('log helper', () => {
  it('should log the requested message', () => {
    const col = 'COL2'
    const type = 'update'
    const msg = 'file updated'
    const check = true
    const expectedOutput = expectOut(col, type, msg, check)
    const stdout = captOut(log, defaultColors[col], type, msg, check)
    stdout.should.equal(expectedOutput)
  })
  it('should log the requested error', () => {
    const col = 'COL4'
    const type = 'error'
    const msg = 'file not found'
    const check = false
    const expectedOutput = expectOut(col, type, msg, check)
    const stdout = captOut(log, defaultColors[col], type, msg, check)
    stdout.should.equal(expectedOutput)
  })
})
