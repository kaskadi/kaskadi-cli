const systemctl = require('../../utils/systemctl.js')

module.exports = ({ user, name, reboot }) => {
  console.log(`INFO: starting ${name} service...`)
  systemctl(user, 'daemon-reload')
  systemctl(user, 'start', name)
  console.log(`SUCCESS: successfully started ${name} service!`)
  if (reboot) {
    console.log(`INFO: enabling ${name} restart on machine reboot...`)
    systemctl(user, 'enable', name)
    console.log(`SUCCESS: ${name} will now be resurrected on machine reboot!`)
  }
}
