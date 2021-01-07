const { spawnSync } = require('child_process')

module.exports = () => {
  return spawnSync('git', ['remote'])
    .stdout.toString().trim()
    .split('\n')
    .filter(line => line !== 'origin')
    .map(line => line.trim())
}
