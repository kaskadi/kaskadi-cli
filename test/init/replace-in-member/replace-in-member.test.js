/* eslint-env mocha */
const replaceInMember = require('../../../functions/init/helpers/replace-in-member.js')
const chai = require('chai')
chai.should()

const oldValue = 'old'
const newValue = 'new'
const obj = {
  prop: true,
  test: 'this is a test',
  field: `this is the ${oldValue} value`,
  number: 20
}

describe('replace-in-member helper', () => {
  it(`should replace the value of the field property from ${oldValue} to ${newValue}`, () => {
    replaceInMember(obj, 'field', oldValue, newValue)
    obj.field.should.equal(`this is the ${newValue} value`)
  })
})
