module.exports = (condition, prefix, ...cmds) => {
  return [...condition ? [prefix] : [], ...cmds]
}
