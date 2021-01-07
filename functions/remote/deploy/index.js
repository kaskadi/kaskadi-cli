const { spawnSync } = require('child_process')

module.exports = ({ remote, branch, sshPath, port }) => {
  process.env.GIT_SSH_COMMAND = `ssh -i ${sshPath} -p ${port} -o IdentitiesOnly=yes`
  spawnSync('git', ['push', remote, branch], { stdio: 'inherit' }) // for now it only works when pushing to master. Pushing to another branch produced the following error: "fatal: You are on a branch yet to be born"
}
