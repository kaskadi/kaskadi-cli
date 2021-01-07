const { spawnSync } = require('child_process')

module.exports = () => {
  return spawnSync('git', ['branch'])
    .stdout.toString().trim()
    .slice(1)
    .split('\n')
    .map(line => line.trim())
}
