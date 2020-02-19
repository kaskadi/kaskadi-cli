const ncp = require('ncp').ncp

module.exports = async (src, dest) => {
  await cp(src, dest)
}

const cp = (src, dest) => {
  return new Promise((resolve, reject) => {
    ncp(src, dest, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
