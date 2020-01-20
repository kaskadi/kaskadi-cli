const init = require('../functions/init.js')
const fs = require('fs')
const ncp = require('ncp').ncp
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

describe('init function', () => {
  before(async () => {
    await cp('test/data', 'test/working-data')
    process.chdir('test/working-data')
    init()
  })
  it('should rename all occurences of template-kaskadi-element in', () => {
    const file = fs.readFileSync('README.md', 'utf8').trim()
    file.should.equal('working-data')
  })
  after(() => {
    process.chdir('../../')
    rimraf.sync('test/working-data')
  })
})

const cp = (src, dest) => {
  return new Promise((resolve, reject) => {
    ncp(src, dest, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
