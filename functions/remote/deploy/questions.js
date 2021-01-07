const remotes = require('../utils/get-remotes.js')()

if (remotes.length === 0) {
  console.log('WARN: no remote other than origin has been found for this repository, aborting...')
  process.exit()
}

const { remote, branch, sshPath, sshPort } = require('../utils/questions.js')

module.exports = [
  remote,
  branch,
  sshPath,
  sshPort
]
