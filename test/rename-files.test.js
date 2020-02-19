/* eslint-env mocha */
const renameFiles = require('../functions/init/helpers/rename-files.js')
const fs = require('fs')
const ncp = require('ncp').ncp
const rimraf = require('rimraf')
const chai = require('chai')
chai.should()

describe('rename-files helper', () => {
  const files = [
    {
      baseName: 'file-1',
      name: 'file-1-test'
    },
    {
      baseName: 'file-2',
      name: 'file-2-test'
    },
    {
      baseName: 'file-3',
      name: 'file-3-test'
    }
  ]
  before(async () => {
    await cp('test/rename-files-data', 'test/rename-files-working-data')
    process.chdir('test/rename-files-working-data')
    const wd = process.cwd()
    renameFiles(wd, files)
  })
  files.forEach(file => {
    it(`should rename ${file.baseName} to ${file.name}`, () => {
      const oldFileExists = fs.existsSync(`${process.cwd()}/${file.baseName}`)
      const newFileExists = fs.existsSync(`${process.cwd()}/${file.name}`)
      oldFileExists.should.equal(false)
      newFileExists.should.equal(true)
    })
  })
  after(() => {
    process.chdir('../../')
    rimraf.sync('test/rename-files-working-data')
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
