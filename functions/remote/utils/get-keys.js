const { readdirSync } = require('fs')
const root = require('./get-ssh-root.js')()

module.exports = () => {
  const excludedFiles = ['known_hosts']
  const filterHandler = key => key.slice(-3) !== 'pub' &&
    key.charAt(0) !== '.' &&
    !excludedFiles.includes(key)
  return readdirSync(root)
    .filter(filterHandler)
}
