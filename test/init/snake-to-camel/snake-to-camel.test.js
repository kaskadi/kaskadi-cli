/* eslint-env mocha */
const snakeToCamel = require('../../../functions/init/helpers/snake-to-camel.js')
const chai = require('chai')
chai.should()

describe('snake-to-camel helper', () => {
  it('should convert a snake cased string to a capitalized camel cased string', () => {
    const snakeCased = 'snake-cased-string'
    const camelCased = snakeToCamel(snakeCased)
    camelCased.should.equal('SnakeCasedString')
  })
})
