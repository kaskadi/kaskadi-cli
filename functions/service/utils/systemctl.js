const execCmd = require('./exec-cmd.js')
const getCmds = require('./get-cmds.js')

module.exports = (isSystem, ...cmds) => {
  execCmd(isSystem, 'systemctl', ...getCmds(!isSystem, '--user', ...cmds))
}
