const replaceNameInFile = require('./replace-name-in-file.js')
const updatePackageJSON = require('./update-package-json.js')

module.exports = function initFiles (wd, initData) {
  const { jsonData, fileData } = initData
  updatePackageJSON(wd, jsonData.baseName, jsonData.name)
  // initData is an array of objects containing information for the init operation on files
  fileData.forEach(data => {
    data.paths.forEach(path => {
      replaceNameInFile(`${wd}/${path}`, data.baseName, data.name)
    })
  })
}
