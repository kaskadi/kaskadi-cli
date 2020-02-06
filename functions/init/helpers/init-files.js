const replaceNameInFile = require('./replace-name-in-file.js')
const updatePackageJSON = require('./update-package-json.js')

module.exports = function initFiles (wd, initData) {
  const { json, files } = initData
  updatePackageJSON(wd, json.baseName, json.name)
  // initData is an array of objects containing information for the init operation on files
  files.forEach(file => {
    file.paths.forEach(path => {
      replaceNameInFile(`${wd}/${path}`, file.baseName, file.name)
    })
  })
}
