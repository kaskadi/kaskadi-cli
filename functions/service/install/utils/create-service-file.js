const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')
const { spawnSync } = require('child_process')
const { join, dirname } = require('path')

module.exports = (opts) => {
  const { system } = opts
  console.log(`INFO: creating service file at ${system ? 'system' : 'user'} level...`)
  const serviceFile = getServiceFile(opts, 'name', 'user', 'entry')
  const [filePath, file] = writeServiceFile(serviceFile, opts)
  console.log(`SUCCESS: service file successfully created at ${filePath}! See file content below.\n`)
  console.log(file)
  console.log('\n')
}

function writeServiceFile (file, opts) {
  const { name, system } = opts
  const tmpFilePath = `/tmp/${Math.random().toString(36).substring(2, 15)}.service`
  writeFileSync(tmpFilePath, file, 'utf8')
  const filePath = system ? `/lib/systemd/system/${name}.service` : `${process.env.HOME}/.config/systemd/user/${name}.service`
  if (!system) {
    createStructure(filePath)
  }
  const cmds = [...system ? ['sudo'] : [], ...['mv', tmpFilePath, filePath]]
  spawnSync(cmds[0], cmds.slice(1), { stdio: 'inherit' })
  return [filePath, file]
}

function getServiceFile (opts, ...phs) {
  let template = readFileSync(join(__dirname, 'template.service'), 'utf8')
  for (const ph of phs) {
    const regexp = new RegExp(`{{${ph}}}`, 'g')
    template = template.replace(regexp, opts[ph])
  }
  return template
}

function createStructure (path) {
  const relativePath = dirname(path).replace(`${process.env.HOME}/`, '')
  const parts = relativePath.split('/')
  const cwd = process.cwd()
  process.chdir(process.env.HOME)
  for (let i = 0; i < parts.length; i++) {
    const dir = parts.slice(0, i + 1).join('/')
    if (!existsSync(dir)) {
      mkdirSync(dir)
    }
  }
  process.chdir(cwd)
}
