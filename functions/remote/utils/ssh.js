const { spawnSync } = require('child_process')

module.exports = (keyPath, port, ip) => cmd => {
  spawnSync('ssh', ['-p', port, '-i', keyPath, `git@${ip}`, cmd], { stdio: 'inherit' })
}
