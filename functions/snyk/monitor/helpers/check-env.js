module.exports = (envVarsData) => {
  for (const data of envVarsData) {
    if (!process.env[data.name]) {
      console.log(`WARNING: missing environment variable ${data.name}. This environment variable is required for this utility to work in GitHub Actions.`)
      process.exit(1)
    }
  }
}
