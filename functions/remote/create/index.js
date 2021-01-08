function writeHook (dest, content) {
  return `cat > ${dest} <<< $'${content}'`
}

function getHook (working) {
  const { readFileSync } = require('fs')
  const { join } = require('path')
  return readFileSync(join(__dirname, 'hooks-data/standard.sh'), 'utf8')
    .replace(/{{working-copy}}/g, working)
}

module.exports = async ({ ip, sshPath, port }) => {
  const ssh = require('../utils/ssh.js')(sshPath, port, ip)
  const { bare, working } = require('../utils/get-remote-paths.js')()
  const commands = [
    `mkdir -p ${bare}`,
    `mkdir -p ${working}`,
    `cd ${bare}`,
    'git init --bare',
    'touch hooks/post-receive',
    writeHook('hooks/post-receive', getHook(working)),
    'chmod +x hooks/post-receive'
  ]
  ssh(commands.join(' && '))
  console.log(`Remote repository successfully set up @ ${ip}!`)
}
