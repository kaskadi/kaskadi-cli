function getWriteHookCmds (content) {
  return content.map(line => `echo "${line}" >> hooks/post-receive`)
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
    ...getWriteHookCmds([
      '#!/bin/sh',
      `GIT_WORK_TREE=${working} git checkout -f`,
      'PWD="$(pwd)"',
      `cd ${working}`,
      'npm i &>/dev/null',
      'cd $PWD'
    ]),
    'chmod +x hooks/post-receive'
  ]
  ssh(commands.join(' && '))
  console.log(`Remote repository successfully set up @ ${ip}!`)
}
