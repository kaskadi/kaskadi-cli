module.exports = function replaceInMember (obj, member, oldName, newName) {
  const oldNameRegex = new RegExp(oldName, 'g')
  obj[member] = obj[member].replace(oldNameRegex, newName)
}
