const capcon = require('capture-console')

module.exports = (func, ...args) => {
  return capcon.captureStdout(function scope () {
    func(...args)
  }).trim()
}
