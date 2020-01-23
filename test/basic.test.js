/* eslint-env mocha */
const init = require('../functions/init.js')
const fs = require('fs')
const ncp = require('ncp').ncp
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

const folderName = 'working-data'
const className = 'WorkingData'
const baseName = 'template-kaskadi-element'
const baseClassName = 'TemplateKaskadiElement'

describe('#init()', () => {
  before(async () => {
    await cp('test/data', `test/${folderName}`)
    process.chdir(`test/${folderName}`)
    init()
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in README.md`, () => {
    const file = fs.readFileSync('README.md', 'utf8').trim()
    file.should.equal(folderName)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in test/basic.test.js`, () => {
    const file = fs.readFileSync('test/basic.test.js', 'utf8').trim()
    file.should.equal(folderName)
  })
  it(`should rename all occurences of ${baseName} to ${folderName} in example/index.html`, () => {
    const file = fs.readFileSync('example/index.html', 'utf8').trim()
    file.should.equal(folderName)
  })
  describe(`should rename all occurences of ${baseName} to ${folderName} in package.json`, () => {
    let pjson
    beforeEach(() => {
      const file = fs.readFileSync('package.json', 'utf8')
      pjson = JSON.parse(file)
    })
    it(`should rename package name to @kaskadi/${folderName}`, () => {
      pjson.name.should.equal(`@kaskadi/${folderName}`)
    })
    it(`should rename package main file to ${folderName}.js`, () => {
      pjson.main.should.equal(`${folderName}.js`)
    })
    it(`should rename repository url to git+https://github.com/kaskadi/${folderName}.git`, () => {
      pjson.repository.url.should.equal(`git+https://github.com/kaskadi/${folderName}.git`)
    })
    it(`should rename repository issues url to https://github.com/kaskadi/${folderName}#readme`, () => {
      pjson.bugs.url.should.equal(`https://github.com/kaskadi/${folderName}#readme`)
    })
    it(`should rename homepage url to https://github.com/kaskadi/${folderName}#readme`, () => {
      pjson.homepage.should.equal(`https://github.com/kaskadi/${folderName}#readme`)
    })
    it(`should rename 1st file source to ${folderName}.js`, () => {
      pjson.kaskadi['s3-push'].files[0].src.should.equal(`${folderName}.js`)
    })
    it(`should rename 1st file destination to modules/@kaskadi/${folderName}/{branch}${folderName}.js`, () => {
      pjson.kaskadi['s3-push'].files[0].dest.should.equal(`modules/@kaskadi/${folderName}/{branch}${folderName}.js`)
    })
    it(`should rename 2nd file destination to modules/@kaskadi/${folderName}/{branch}example/index.html`, () => {
      pjson.kaskadi['s3-push'].files[1].dest.should.equal(`modules/@kaskadi/${folderName}/{branch}example/index.html`)
    })
  })
  describe(`should rename ${baseName}.js to ${folderName}.js and replace all occurences of ${baseName} and ${baseClassName}`, () => {
    it(`should rename ${baseName}.js to ${folderName}.js`, () => {
      const baseFile = fs.existsSync(`${baseName}.js`)
      const newFile = fs.existsSync(`${folderName}.js`)
      baseFile.should.equal(false)
      newFile.should.equal(true)
    })
    it(`should replace all occurences ${baseName} by ${folderName}`, () => {
      const file = fs.readFileSync(`${folderName}.js`, 'utf8')
      const files = file.split('\n')
      files[0].should.equal(folderName)
    })
    it(`should replace all occurences ${baseClassName} by ${className}`, () => {
      const file = fs.readFileSync(`${folderName}.js`, 'utf8')
      const files = file.split('\n')
      files[1].should.equal(className)
    })
    it('should not throw on second run', () => {
      init.should.not.throw()
    })
  })
  after(() => {
    process.chdir('../../')
    rimraf.sync(`test/${folderName}`)
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
