const { spawnSync } = require('child_process')

module.exports = ({ name, ip }) => {
  const { bare } = require('../utils/get-remote-paths.js')()
  spawnSync('git', ['remote', 'add', name, `ssh://git@${ip}${bare}`], { stdio: 'inherit' })
  console.log(`Remote repository successfully added to your remotes under the alias ${name}!`)
}
