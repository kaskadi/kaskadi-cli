const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs')
const { join, dirname } = require('path')
const execCmd = require('../../utils/exec-cmd.js')

module.exports = (opts) => {
  const { user } = opts
  console.log(`INFO: creating service file at ${user ? 'system' : 'user'} level...`)
  const [filePath, file] = writeServiceFile(getServiceFile(opts), opts)
  console.log(`SUCCESS: service file successfully created at ${filePath}! See file content below.\n`)
  console.log(file)
  console.log('\n')
}

function writeServiceFile (file, opts) {
  const { name, user } = opts
  const tmpFilePath = `/tmp/${Math.random().toString(36).substring(2, 15)}.service`
  writeFileSync(tmpFilePath, file, 'utf8')
  const filePath = user ? `/lib/systemd/system/${name}.service` : `${process.env.HOME}/.config/systemd/user/${name}.service`
  if (existsSync(filePath)) {
    console.log(`ERROR: service with name ${name} already exists! Please provide a valid name.`)
    process.exit(1)
  }
  if (!user) {
    createStructure(filePath)
  }
  execCmd(user)('mv', tmpFilePath, filePath)
  return [filePath, file]
}

function getServiceFile (opts) {
  let template = readFileSync(join(__dirname, 'template.service'), 'utf8')
  for (const ph of ['name', 'entry', 'user']) {
    template = replacePlaceholder(template, ph, opts[ph])
  }
  return template
}

function replacePlaceholder (str, ph, value) {
  const regexp = new RegExp(`{{${ph}}}`, 'g')
  const replacementValue = ph === 'user'
    ? value
      ? `\nUser=${value}`
      : ''
    : value
  return str.replace(regexp, replacementValue)
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
