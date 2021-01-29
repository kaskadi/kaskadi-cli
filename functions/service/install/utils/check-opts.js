module.exports = (opts) => {
  const requiredOpts = ['name', 'entry']
  const providedOpts = Object.keys(opts)
  const missingOpts = requiredOpts.filter(opt => !providedOpts.includes(opt))
  return {
    missingOpts,
    isValid: missingOpts.length === 0
  }
}
