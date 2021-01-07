const { spawnSync } = require('child_process')
const { basename } = require('path')

module.exports = () => {
  const repoPath = spawnSync('git', ['rev-parse', '--show-toplevel']).stdout.toString().trim()
  const dirname = basename(repoPath)
  return {
    bare: `/home/git/remotes/${dirname}.git`,
    working: `/home/repositories/${dirname}`
  }
}
