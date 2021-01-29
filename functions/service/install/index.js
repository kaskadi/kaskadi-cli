const checkOpts = require('./utils/check-opts.js')
const createServiceFile = require('./utils/create-service-file.js')
const startService = require('./utils/start-service.js')

module.exports = (opts) => {
  console.log('INFO: checking command options...')
  const optsValidation = checkOpts(opts)
  if (!optsValidation.isValid) {
    const { missingOpts } = optsValidation
    console.log(`ERROR: missing option${missingOpts.length > 1 ? 's' : ''} ${missingOpts.join(', ')}...`)
    process.exit(1)
  }
  createServiceFile(opts)
  startService(opts)
}
