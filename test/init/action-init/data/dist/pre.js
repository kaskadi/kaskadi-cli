const { spawnSync } = require('child_process')
if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY !== 'kaskadi/template-action') {
  const callingRepo = process.cwd()
  process.chdir(__dirname)
  process.chdir('..')
  console.log('INFO: installing action dependencies...')
  console.log('************ NPM ouput ************')
  spawnSync('npm', ['i', '--only=prod'], { stdio: 'inherit' })
  console.log('************ End of NPM ouput ************')
  console.log('SUCCESS: dependencies installed!')
  process.chdir(callingRepo)
}
