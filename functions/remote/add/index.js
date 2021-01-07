const { spawnSync } = require('child_process')

module.exports = ({ name, ip, path }) => {
  spawnSync('git', ['remote', 'add', name, `ssh://git@${ip}${path}`], { stdio: 'inherit' })
}
