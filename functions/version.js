const exec = require('child_process').exec
const p = require(process.cwd() + "/package.json")
async function version () {
  let version = 0 
  try{
    version = (await getNPMVersion("kaskadi-cli")).trim()
  }catch(err){
    console.log("package not on npm! aborting")
  }
  if(p.version === version){
    console.log(JSON.stringify({package: p.version, npm: version}, null, 2))
  }
}

function getNPMVersion (package) {
  return new Promise((resolve, reject) => {
    exec(`npm view ${package} version`, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout)
      }
    })
  })
}

module.exports = version
