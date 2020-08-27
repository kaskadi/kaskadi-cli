const inquirer = require('inquirer')

module.exports = () => {
  return inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Please input your Snyk API token',
    validate: input => !input ? 'Please provide your Snyk API token' : true
  }]).then(answer => answer.token)
}
