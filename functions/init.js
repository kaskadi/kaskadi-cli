const fs = require('fs')
const color = require('./colors.js')
module.exports = function init () {
  const COL1 = color('royalblue')
  const COL2 = color('limegreen')
  const COL3 = color('indigo')
  const COL4 = color('crimson')
  const RESET = '\x1b[0m'
  const wd = process.cwd().split('/')
  const name = wd[wd.length - 1]
  const baseName = 'template-kaskadi-element'
  const baseClassName = 'TemplateKaskadiElement'
  const baseNameRegex = new RegExp(baseName, 'g')
  const baseClassNameRegex = new RegExp(baseClassName, 'g')
  const f = fs.readFileSync(process.cwd() + '/package.json', 'utf8')
  const p = JSON.parse(f)
  p.name = '@kaskadi/' + name
  p.main = name + '.js'
  p.repository.url = `git+https://github.com/kaskadi/${name}.git`
  p.bugs.url = `https://github.com/kaskadi/${name}#readme`
  p.homepage = `https://github.com/kaskadi/${name}#readme`
  p.kaskadi['s3-push'].files[0].src = `${name}.js`
  p.kaskadi['s3-push'].files[0].dest = `modules/@kaskadi/${name}/{branch}${name}.js`
  p.kaskadi['s3-push'].files[1].dest = `modules/@kaskadi/${name}/{branch}example/index.html`

  fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(p, null, 2), 'utf8')
  console.log(`${COL1}updated ${RESET} package.json ${COL2}✓${RESET} `)
  const f2 = fs.readFileSync(process.cwd() + '/test/basic.test.js', 'utf8')

  fs.writeFileSync(process.cwd() + '/test/basic.test.js', f2.replace(baseNameRegex, name), 'utf8')
  console.log(`${COL1}updated ${RESET} test/basic.test.js ${COL2}✓${RESET} `)

  const f2a = fs.readFileSync(process.cwd() + '/README.md', 'utf8')
  fs.writeFileSync(process.cwd() + '/README.md', f2a.replace(baseNameRegex, name), 'utf8')
  console.log(`${COL1}updated ${RESET} README.md ${COL2}✓${RESET} `)

  const f3 = fs.readFileSync(process.cwd() + '/example/index.html', 'utf8')
  fs.writeFileSync(process.cwd() + '/example/index.html', f3.replace(baseNameRegex, name), 'utf8')
  console.log(`${COL1}updated ${RESET} example/index.html ${COL2}✓${RESET} `)
  try {
    let f4 = fs.readFileSync(process.cwd() + `/${baseName}.js`, 'utf8')
    f4 = f4.replace(baseNameRegex, name)
    f4 = f4.replace(baseClassNameRegex, snakeToCamel(name))
    fs.writeFileSync(process.cwd() + `/${baseName}.js`, f4, 'utf8')
    console.log(`${COL1}updated ${RESET} ${baseName}.js ${COL2}✓${RESET} `)
    fs.renameSync(`${baseName}.js`, name + '.js')
    console.log(`${COL1}renamed ${RESET} ${baseName}.js to ${COL3}${name}.js ${COL2}✓${RESET} `)
  } catch (err) {
    if (err) {
      console.log(`${COL4}error ${RESET} ${baseName}.js not found ${COL4}x${RESET} `)
    }
  }
}

function snakeToCamel (word) {
  let res = word.charAt(0).toUpperCase()
  for (var i = 1; i < word.length; i++) {
    if (word.charAt(i) === '-') {
      i++
      res += word.charAt(i).toUpperCase()
    } else {
      res += word.charAt(i)
    }
  }
  return res
}
