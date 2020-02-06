/* eslint-env mocha */
const color = require('../functions/colors/colors.js')
const red = '\u001b[38;2;255;0;0m\u001b[10m'
const redbg = '\u001b[48;2;255;0;0m\u001b[10m'
describe('the color function', () => {
  it('should handle single red, green and blue values as well as # color codes and color names', () => {
    color('red').should.equal(red)
    color('#ff0000').should.equal(red)
    color(255, 0, 0).should.equal(red)
    color('red', 1).should.equal(redbg)
    color('green').should.equal(color(0, 128, 0))
  })
})
