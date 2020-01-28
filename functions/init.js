const fs = require('fs')
const color = require('./colors.js')
const COL1 = color('royalblue')
const COL2 = color('limegreen')
const COL3 = color('royalblue')
const COL4 = color('crimson')
const RESET = '\x1b[0m'
module.exports = function init () {
  const wd = process.cwd().split('/')
  const name = wd[wd.length - 1]
  const baseName = 'template-kaskadi-element'
  updatePackageJSON(baseName, name)
  replaceNameInFile(process.cwd() + '/test/basic.test.js', baseName, name)
  replaceNameInFile(process.cwd() + '/README.md', baseName, name)
  replaceNameInFile(process.cwd() + '/example/index.html', baseName, name)
  replaceNameInFile(`${process.cwd()}/${baseName}.js`, baseName, name)
  replaceNameInFile(`${process.cwd()}/${baseName}.js`, snakeToCamel(baseName), snakeToCamel(name))
  if (fs.existsSync(`${baseName}.js`)) {
    fs.renameSync(`${baseName}.js`, name + '.js')
  } else {
    log(COL4, 'error', `${baseName}.js not found`, false)
  }
  log(COL1, 'rename', `${baseName}.js to ${COL3}${name}.js`, true)
}

function replaceNameInFile (fileName, oldName, newName) {
  const oldNameRegex = new RegExp(oldName, 'g')
  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName, 'utf8')
    fs.writeFileSync(fileName, file.replace(oldNameRegex, newName), 'utf8')
    updateNotice(fileName)
  } else {
    log(COL4, 'error', `${fileName} not found`, false)
  }
}

function updatePackageJSON (oldName, newName) {
  const f = fs.readFileSync(process.cwd() + '/package.json', 'utf8')
  const p = JSON.parse(f)
  replaceInTree(p, oldName, newName)
  fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(p, null, 2), 'utf8')
  updateNotice('package.json')
}

function replaceInTree (root, oldName, newName) {
  for (const name in root) {
    if (typeof root[name] === 'string') {
      replaceInMember(root, name, oldName, newName)
    }
    if (typeof root[name] === 'object') {
      replaceInTree(root[name], oldName, newName)
    }
  }
}

function replaceInMember (obj, member, oldName, newName) {
  const oldNameRegex = new RegExp(oldName, 'g')
  obj[member] = obj[member].replace(oldNameRegex, newName)
}

function updateNotice (name) {
  log(COL1, 'updated', name, true)
}

function log (col, type, msg, check) {
  console.log(`${col}${type} ${RESET} ${msg} ${check ? COL2 : COL4}${check ? '✓' : 'x'}${RESET} `)
}

function snakeToCamel (word) {
  let res = word.charAt(0).toUpperCase()
  for (var i = 1; i < word.length; i++) {
    if (word.charAt(i) === '-') {
      i++
      res += word.charAt(i).toUpperCase()
    } else {
      res += word.charAt(i)
    }
  }
  return res
}
