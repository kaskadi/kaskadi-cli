const colorNames = require('./color-names.json')
module.exports = function color (...args) {
  let rgb
  if (typeof args[0] === 'string') {
    rgb = extractFromString(args[0])
    setMember(rgb, 'bg', args, 1)
    setMember(rgb, 'style', args, 2)
  } else {
    rgb = {
      r: args[0],
      g: args[1],
      b: args[2]
    }
    setMember(rgb, 'bg', args, 3)
    setMember(rgb, 'style', args, 4)
  }
  return cliColorString(rgb)
}

function extractFromString (str) {
  const firstLetter = str.substr(0, 1)
  if (firstLetter === '#') {
    return getColorFromRGB(str)
  } else {
    return getColorFromRGB(colorNames[str])
  }
}

function cliColorString (options) {
  const opt = { ...{ bg: 0, style: 10 }, ...options }
  const l = opt.bg ? 48 : 38
  return `\x1b[${l};2;${opt.r};${opt.g};${opt.b}m\x1b[${opt.style}m`
}

function setMember (obj, name, arr, offs) {
  if (arr.length > offs) {
    obj[name] = arr[offs]
  }
}

function getColorFromRGB (hexCode) {
  return {
    r: parseInt(hexCode.substr(1, 2), 16),
    g: parseInt(hexCode.substr(3, 2), 16),
    b: parseInt(hexCode.substr(5, 2), 16)
  }
}
