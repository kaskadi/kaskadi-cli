const execCmd = require('./exec-cmd.js')

module.exports = (opts) => {
  console.log('INFO: starting service...')
  reload(opts)
  start(opts)
  if (opts.reboot) {
    console.log('INFO: enabling service restart on machine reboot...')
    enable(opts)
  }
}

function getSystemCtlCmds (isSystem, ...cmds) {
  return [...isSystem ? [] : ['--user'], ...cmds]
}

function reload (opts) {
  const { user } = opts
  execCmd(user, 'systemctl', ...getSystemCtlCmds(user, 'daemon-reload'))
}

function start (opts) {
  const { user, name } = opts
  execCmd(user, 'systemctl', ...getSystemCtlCmds(user, 'start', name))
}

function enable (opts) {
  const { user, name } = opts
  execCmd(user, 'systemctl', ...getSystemCtlCmds(user, 'enable', name))
}
