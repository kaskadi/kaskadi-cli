const remotes = require('./utils/get-remotes.js')()

if (remotes.length === 0) {
  console.log('WARN: no remote other than origin has been found for this repository, aborting...')
  process.exit()
}

const { filter } = require('../prompt-defaults.js')

module.exports = [
  {
    type: 'list',
    name: 'remote',
    message: 'Remote to deploy to',
    choices: remotes
  },
  {
    type: 'list',
    name: 'branch',
    message: 'Branch to deploy',
    choices: require('./utils/get-branches.js')()
  },
  {
    type: 'list',
    name: 'sshPath',
    message: 'SSH key to be used for authentication',
    choices: require('./utils/get-keys.js')(),
    filter: input => `${require('./utils/get-ssh-root.js')()}/${input}`
  },
  {
    type: 'input',
    name: 'port',
    message: 'Port to be used for SSH authentication',
    default: '22',
    validate: input => {
      input = Number(filter(input))
      return isNaN(input) || input <= 0 ? 'Please provide a valid port (stricly positive number)' : true
    },
    filter
  }
]
