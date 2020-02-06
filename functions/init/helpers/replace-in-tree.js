const replaceInMember = require('./replace-in-member.js')

const replaceInTree = (root, oldName, newName) => {
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

module.exports = replaceInTree
