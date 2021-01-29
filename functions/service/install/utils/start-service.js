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
  const { system } = opts
  execCmd(system, 'systemctl', ...getSystemCtlCmds(system, 'daemon-reload'))
}

function start (opts) {
  const { system, name } = opts
  execCmd(system, 'systemctl', ...getSystemCtlCmds(system, 'start', name))
}

function enable (opts) {
  const { system, name } = opts
  execCmd(system, 'systemctl', ...getSystemCtlCmds(system, 'enable', name))
}
