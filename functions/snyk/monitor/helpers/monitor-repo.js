const fetch = require('node-fetch')

module.exports = ({ name, owner }) => {
  const body = {
    target: {
      owner,
      name,
      branch: 'master'
    }
  }
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `token ${process.env.SNYK_API_TOKEN}`
    },
    body: JSON.stringify(body)
  }
  return fetch(`https://snyk.io/api/v1/org/${process.env.SNYK_ORG_ID}/integrations/${process.env.SNYK_INTEGRATION_ID}/import`, init)
    .then(res => res.json())
    .then(console.log)
}
