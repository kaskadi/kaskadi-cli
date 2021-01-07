const validOps = ['create', 'add', 'deploy']
const inquirer = require('inquirer')

module.exports = async (op) => {
  if (!validOps.includes(op)) {
    console.log(`ERROR: ${op} is not a valid operation for the remote module...`)
  } else {
    await inquirer.prompt(require(`./${op}/questions.js`))
      .then(require(`./${op}/index.js`))
  }
}
