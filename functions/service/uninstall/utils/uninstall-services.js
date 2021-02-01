let systemctl = require('../../utils/systemctl.js')
const execCmd = require('../../utils/exec-cmd.js')

module.exports = ({ name, services }) => {
  if (services.length === 0) {
    console.log(`INFO: no service with the name ${name} is currently installed.`)
    process.exit(0)
  }
  console.log(`INFO: uninstalling service ${name}...`)
  for (const service of services) {
    uninstallService(name, service)
  }
  console.log(`SUCCESS: successfully uninstalled ${name}!`)
}

function uninstallService (name, { isSystem, location }) {
  systemctl = systemctl(isSystem)
  systemctl('stop', name)
  systemctl('disable', name)
  execCmd(isSystem)('rm', location)
  systemctl('daemon-reload')
  systemctl('reset-failed')
}
