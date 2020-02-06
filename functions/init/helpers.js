const fs = require('fs')
const defaultColors = require('./default-colors.js')

function replaceNameInFile (fileName, oldName, newName) {
  const oldNameRegex = new RegExp(oldName, 'g')
  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName, 'utf8')
    fs.writeFileSync(fileName, file.replace(oldNameRegex, newName), 'utf8')
    updateNotice(fileName)
  } else {
    log(defaultColors.COL4, 'error', `${fileName} not found`, false)
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
    switch (typeof root[name]) {
      case 'string':
        replaceInMember(root, name, oldName, newName)
        break
      case 'object':
        replaceInTree(root[name], oldName, newName)
        break
    }
  }
}

function replaceInMember (obj, member, oldName, newName) {
  const oldNameRegex = new RegExp(oldName, 'g')
  obj[member] = obj[member].replace(oldNameRegex, newName)
}

function updateNotice (name) {
  log(defaultColors.COL1, 'updated', name, true)
}

function log (col, type, msg, check) {
  console.log(`${col}${type} ${defaultColors.RESET} ${msg} ${check ? defaultColors.COL2 : defaultColors.COL4}${check ? '✓' : 'x'}${defaultColors.RESET} `)
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

module.exports = {
  replaceNameInFile,
  updatePackageJSON,
  replaceInTree,
  replaceInMember,
  updateNotice,
  log,
  snakeToCamel
}
