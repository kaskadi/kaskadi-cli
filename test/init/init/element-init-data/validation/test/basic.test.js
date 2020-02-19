/* eslint-env browser, mocha */
import '../working-data.js'
describe('working-data', () => {
  it('should render the string "Hello World"', async () => {
    // create working-data element
    var elem = document.createElement('working-data')
    document.body.appendChild(elem)
    // wait until it's finished rendering
    await elem.updateComplete
    // actual test
    elem.shadowRoot.querySelector('#en').textContent.should.equal('Hello World!')
    var cs = getComputedStyle(elem.shadowRoot.querySelector('div'))
    cs.color.should.equal('rgb(255, 0, 0)')
  })
})
