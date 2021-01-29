module.exports = (opts) => {
  const requiredOpts = ['name', 'user', 'entry']
  const providedOpts = Object.keys(opts).filter(opt => opt !== 'system')
  const missingOpts = requiredOpts.filter(opt => !providedOpts.includes(opt))
  return {
    missingOpts,
    isValid: missingOpts.length === 0
  }
}
