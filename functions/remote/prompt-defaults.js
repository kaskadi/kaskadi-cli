const validate = errMsg => input => {
  input = filter(input)
  return !!input || errMsg
}
const filter = input => input.trim()

module.exports = { validate, filter }
