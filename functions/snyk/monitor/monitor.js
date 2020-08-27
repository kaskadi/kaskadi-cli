const checkEnv = require('./helpers/check-env.js')
const setEnv = require('./helpers/set-env.js')
const getRepoInfo = require('./helpers/get-repo-info.js')
const monitorRepo = require('./helpers/monitor-repo.js')

const envVarsData = [{
  name: 'SNYK_API_TOKEN',
  promptMessage: 'Please input your Snyk API token',
  validateHandler: input => !input ? 'Please provide your Snyk API token' : true
},
{
  name: 'SNYK_ORG_ID',
  promptMessage: 'Please input your Snyk organization ID',
  validateHandler: input => !input ? 'Please provide your Snyk organization ID' : true
},
{
  name: 'SNYK_INTEGRATION_ID',
  promptMessage: 'Please input your Snyk integration ID',
  validateHandler: input => !input ? 'Please provide your Snyk integration ID' : true
}]

module.exports = async () => {
  if (process.env.GITHUB_ACTIONS) {
    checkEnv(envVarsData)
  } else {
    await setEnv(envVarsData)
  }
  await getRepoInfo()
    .then(monitorRepo)
    .catch(err => {
      console.log('Something happened while trying to monitor your project...')
      console.log(err)
      process.exit(1)
    })
}
