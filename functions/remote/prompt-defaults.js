const validate = errMsg => input => !!input || errMsg
const filter = input => input.trim()

module.exports = { validate, filter }
