const fs = require("fs")
const color = require("./colors.js")
module.exports = function init(){
  const COL1 = color("royalblue")
  const COL2 = color("limegreen")
  const COL3 = color("indigo")
  const COL4 = color("crimson")
  const RESET = "\x1b[0m"
  const wd = process.cwd().split("/")
  const name = wd[wd.length-1]
  const f = fs.readFileSync(process.cwd() + "/package.json","utf8")
  let p = JSON.parse(f)
  p.name = name
  p.main = name + ".js"
  p.repository.url = `git+https://github.com/kaskadi/${name}.git`
  p.bugs.url = `https://github.com/kaskadi/${name}#readme`
  p.homepage = `https://github.com/kaskadi/${name}#readme`
  p.kaskadi["s3-push"].files[0].src = `${name}.js`
  p.kaskadi["s3-push"].files[0].dest = `modules/@kaskadi/${name}/{branch}${name}.js`
  fs.writeFileSync(process.cwd() + "/package.json",JSON.stringify(p,null,2),"utf8")
  console.log(`${COL1}updated ${RESET} package.json ${COL2}✓${RESET} `)
  const f2 = fs.readFileSync(process.cwd() + "/test/basic.test.js","utf8")
  fs.writeFileSync(process.cwd() + "/test/basic.test.js",f2.replace(/kaskadi-template/g,name),"utf8")
  console.log(`${COL1}updated ${RESET} test/basic.test.js ${COL2}✓${RESET} `)
  const f3 = fs.readFileSync(process.cwd() + "/example/index.html","utf8")
  fs.writeFileSync(process.cwd() + "/example/index.html",f3.replace(/kaskadi-template/g,name),"utf8")
  console.log(`${COL1}updated ${RESET} example/index.html ${COL2}✓${RESET} `)
  try{
    let f4 = fs.readFileSync(process.cwd() + "/kaskadi-template.js","utf8")
    f4 = f4.replace(/kaskadi-template/g,name)
    f4 = f4.replace(/kaskadiTemplate/g,name)
    fs.writeFileSync(process.cwd() + "/kaskadi-template.js",f4,"utf8")
    console.log(`${COL1}updated ${RESET} kaskadi-template.js ${COL2}✓${RESET} `)
    fs.renameSync("kaskadi-template.js",name+".js")
    console.log(`${COL1}renamed ${RESET} kaskadi-template.js to ${COL3}${name}.js ${COL2}✓${RESET} `)

  }catch(err){
    if(err){
      console.log(`${COL4}error ${RESET} kaskadi-template.js not found ${COL4}x${RESET} `)
    }
  }
}
