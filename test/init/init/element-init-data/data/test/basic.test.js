/* eslint-env browser, mocha */
import '../template-kaskadi-element.js'
describe('template-kaskadi-element', () => {
  it('should render the string "Hello World"', async () => {
    // create template-kaskadi-element element
    var elem = document.createElement('template-kaskadi-element')
    document.body.appendChild(elem)
    // wait until it's finished rendering
    await elem.updateComplete
    // actual test
    elem.shadowRoot.querySelector('#en').textContent.should.equal('Hello World!')
    var cs = getComputedStyle(elem.shadowRoot.querySelector('div'))
    cs.color.should.equal('rgb(255, 0, 0)')
  })
})
