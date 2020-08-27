// const promptToken = require('./helpers/prompt-token.js')
const getRepoInfo = require('./helpers/get-repo-info.js')

module.exports = async () => {
  if (process.env.GITHUB_ACTIONS && !process.env.SNYK_TOKEN) {
    console.log('You have to provide your Snyk API token as a SNYK_TOKEN environment variable when running inside of a GitHub Action...')
    process.exit(1)
  }
  await getRepoInfo().then(console.log)
  // if repo public, we will monitor as a public project. If it's not (or it doesn't exist), then we monitor as a local/private project
  // process.env.SNYK_TOKEN = process.env.SNYK_TOKEN || await promptToken()
  // spawnSync('node', [snykCli, 'monitor'], { stdio: 'inherit' })
}
