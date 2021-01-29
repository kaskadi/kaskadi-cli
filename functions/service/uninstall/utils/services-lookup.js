const { existsSync } = require('fs')

module.exports = ({ name }) => {
  console.log(`INFO: scanning services for ${name}...`)
  const systemServiceLocation = `/lib/systemd/system/${name}.service`
  const userServiceLocation = `${process.env.HOME}/.config/systemd/user/${name}.service`
  const services = [
    lookupService(systemServiceLocation, true),
    lookupService(userServiceLocation)
  ].filter(service => service.exists)
  return {
    name,
    services
  }
}

function lookupService (location, isSystem = false) {
  return {
    isSystem,
    exists: existsSync(location),
    location
  }
}
