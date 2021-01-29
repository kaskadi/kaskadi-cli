const checkOpts = require('./utils/check-opts.js')
const servicesLookup = require('./utils/services-lookup.js')
const uninstallServices = require('./utils/uninstall-services.js')

module.exports = (opts) => {
  console.log('INFO: checking command options...')
  if (!checkOpts(opts)) {
    console.log('ERROR: no name was provided for the service to uninstall... Please provide a service name via the option -n/--name.')
    process.exit(1)
  }
  uninstallServices(servicesLookup(opts))
}
