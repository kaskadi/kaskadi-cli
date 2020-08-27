const inquirer = require('inquirer')

module.exports = (envVarsData) => {
  return prompt(envVarsData).then(setEnv)
}

function prompt (envVarsData) {
  const questions = envVarsData.map(data => {
    return {
      type: 'input',
      name: data.name,
      message: data.promptMessage,
      validate: data.validateHandler,
      when: !process.env[data.name]
    }
  })
  return inquirer.prompt(questions)
}

function setEnv (inputs) {
  for (const input in inputs) {
    process.env[input] = inputs[input]
  }
}
