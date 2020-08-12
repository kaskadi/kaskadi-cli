const replaceNameInFile = require('./replace-name-in-file.js')

module.exports = function initFiles (wd, initData) {
  for (const data of initData) {
    for (const path of data.paths) {
      replaceNameInFile(`${wd}/${path}`, data.baseName, data.name)
    }
  }
}
