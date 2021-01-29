const { spawnSync } = require('child_process')

module.exports = (isSystem, ...cmds) => {
  const spawnCmds = getCmds(isSystem, ...cmds)
  spawnSync(spawnCmds[0], spawnCmds.slice(1), { stdio: 'inherit' })
}

function getCmds (isSystem, ...cmds) {
  return [...isSystem ? ['sudo'] : [], ...cmds]
}
