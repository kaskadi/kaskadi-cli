const { spawnSync } = require('child_process')

module.exports = ({ remote, branch, sshPath, port }) => {
  process.env.GIT_SSH_COMMAND = `ssh -i ${sshPath} -p ${port} -o IdentitiesOnly=yes`
  spawnSync('git', ['push', '--dry-run', remote, branch], { stdio: 'inherit' })
}
