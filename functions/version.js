module.exports = () => {
  const { spawnSync } = require('child_process')
  const path = require('path')
  const p = require(path.join(__dirname, '..', 'package.json'))
  const version = spawnSync('npm', ['view', p.name, 'version']).stdout.toString().trim()
  console.log(JSON.stringify({ local_installation: p.version, npm: version }, null, 2))
}
