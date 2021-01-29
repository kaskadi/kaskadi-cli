#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()
program
  .name('kaskadi')
  .usage('[options] command')
  .version(require('./package.json').version)
program
  .command('init <type>')
  .description('initialize a repository. <type> argument defines which kind of template the repository is following. Valid values are: action, api, lambda, element, layer and package.')
  .action(require('./functions/init/init.js'))
program
  .command('render')
  .option('-e, --element <element>', 'element to render')
  .description('render the given element')
  .action(require('./functions/render/render.js'))
program
  .command('remote <action>')
  .description('interact with a remote repository. <action> argument defines which kind of action we would like to perform on this remote repository. Valid values are: create, add, deploy.')
  .action(require('./functions/remote/remote.js'))
program
  .command('service <action>')
  .option('-n, --name <name>', 'name of the service')
  .option('-u, --user <user>', 'user owning the process. Only for install.')
  .option('-e, --entry <entry>', 'path to process entry point. Only for install.')
  .option('-s, --system', 'whether or not to create the service at system level. Only for install.')
  .option('-r, --reboot', 'whether or not to restart the service on reboot. Only for install.')
  .description('manipulate services to be used by systemd. <action> argument defines which kind of action we would like to perform on a service. Valid values are: install, delete.')
  .action(require('./functions/service/service.js'))

program.parse(process.argv)
