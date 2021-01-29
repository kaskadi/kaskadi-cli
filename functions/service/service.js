const validActions = ['install', 'uninstall']

module.exports = function (action, opts) {
  if (!validActions.includes(action)) {
    console.log(`ERROR: ${action} is not a valid operation for the service module...`)
  } else {
    require(`./${action}/index.js`)(opts)
  }
}
