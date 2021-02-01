const { spawnSync } = require('child_process')
const getCmds = require('./get-cmds.js')

module.exports = isSystem => (...cmds) => {
  const spawnCmds = getCmds(isSystem, 'sudo', ...cmds)
  spawnSync(spawnCmds[0], spawnCmds.slice(1), { stdio: 'inherit' })
}
