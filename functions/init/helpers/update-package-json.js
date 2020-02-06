const fs = require('fs')
const replaceInTree = require('./replace-in-tree.js')
const updateNotice = require('./update-notice.js')

module.exports = function updatePackageJSON (wd, oldName, newName) {
  const f = fs.readFileSync(`${wd}/package.json`, 'utf8')
  const p = JSON.parse(f)
  replaceInTree(p, oldName, newName)
  fs.writeFileSync(`${wd}/package.json`, JSON.stringify(p, null, 2), 'utf8')
  updateNotice('package.json')
}
