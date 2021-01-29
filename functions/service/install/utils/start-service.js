const systemctl = require('../../utils/systemctl.js')

module.exports = ({ user, name, reboot }) => {
  console.log('INFO: starting service...')
  systemctl(user, 'daemon-reload')
  systemctl(user, 'start', name)
  if (reboot) {
    console.log('INFO: enabling service restart on machine reboot...')
    systemctl(user, 'enable', name)
  }
}
