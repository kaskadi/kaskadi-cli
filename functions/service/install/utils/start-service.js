const execCmd = require('./exec-cmd.js')

module.exports = (opts) => {
  reload(opts)
  start(opts)
  if (opts.reboot) {
    enable(opts)
  }
}

function getSystemCtlCmd (isSystem, cmd) {
  return `${!isSystem ? '--user ' : ''}${cmd}`
}

function reload (opts) {
  const { system } = opts
  execCmd(system, 'systemctl', getSystemCtlCmd(system, 'daemon-reload'))
}

function start (opts) {
  const { system, name } = opts
  execCmd(system, 'systemctl', getSystemCtlCmd(system, 'start'), name)
}

function enable (opts) {
  const { system, name } = opts
  execCmd(system, 'systemctl', getSystemCtlCmd(system, 'enable'), name)
}
