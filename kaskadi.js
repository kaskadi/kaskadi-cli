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

program.parse(process.argv)

// force
