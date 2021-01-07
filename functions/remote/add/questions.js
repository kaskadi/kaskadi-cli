const { validate, filter } = require('../prompt-defaults.js')

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Desired name of the remote',
    validate: validate('Please provide a remote name'),
    filter
  },
  {
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
  {
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
  }
]
