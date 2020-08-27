const parseGitUrl = require('git-url-parse')
const getRemoteUrl = require('git-remote-origin-url')

module.exports = () => {
  return getRemoteUrl().then(parseGitUrl)
}
