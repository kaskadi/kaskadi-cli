const validate = errMsg => input => !!input || errMsg
const filter = input => input.trim()

module.exports = {
  remoteName: {
    type: 'input',
    name: 'name',
    message: 'Desired name of the remote',
    validate: validate('Please provide a remote name'),
    filter
  },
  ip: {
    type: 'input',
    name: 'ip',
    message: 'IP of the remote server',
    validate: input => {
      input = filter(input)
      const ipRegexp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      return ipRegexp.test(input) || 'Please provide a valid IP address'
    },
    filter
  },
  remotePath: {
    type: 'input',
    name: 'path',
    message: 'Absolute path to the remote on server',
    validate: validate('Please provide a path'),
    filter: input => {
      let answer = filter(input)
      if (answer.slice(-4) !== '.git') {
        answer = answer + '.git'
      }
      if (answer.charAt(0) !== '/') {
        answer = '/' + answer
      }
      return answer
    }
  },
  remote: {
    type: 'list',
    name: 'remote',
    message: 'Remote to deploy to',
    choices: require('./get-remotes.js')()
  },
  branch: {
    type: 'list',
    name: 'branch',
    message: 'Branch to deploy',
    choices: require('./get-branches.js')()
  },
  sshPath: {
    type: 'list',
    name: 'sshPath',
    message: 'SSH key to be used for authentication',
    choices: require('./get-keys.js')(),
    filter: input => `${require('./get-ssh-root.js')()}/${input}`
  },
  sshPort: {
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
}
