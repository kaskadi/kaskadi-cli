const { spawnSync } = require('child_process')
const path = require('path')
const inquirer = require('inquirer')
const snykModulePath = path.join(__dirname, '..', '..', 'node_modules/snyk')
const snykCli = path.join(snykModulePath, require(`${snykModulePath}/package.json`).bin.snyk)

module.exports = async () => {
  if (process.env.GITHUB_ACTIONS && !process.env.SNYK_TOKEN) {
    console.log('You have to provide your Snyk API token as a SNYK_TOKEN environment variable when running inside of a GitHub Action...')
    process.exit(1)
  }
  process.env.SNYK_TOKEN = process.env.SNYK_TOKEN || await promptToken()
  spawnSync('node', [snykCli, 'monitor'], { stdio: 'inherit' })
}

function promptToken () {
  return inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Please input your Snyk API token',
    validate: input => !input ? 'Please provide your Snyk API token' : true
  }]).then(answer => answer.token)
}
