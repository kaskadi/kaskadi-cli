// small helper function to modify base mocha pass text color so it's actually visible with zsh solarized theme
let colors = require('mocha/lib/reporters/base').colors
colors.pass = 32
