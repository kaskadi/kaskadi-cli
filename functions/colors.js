const colorNames = require("./color-names.json")
module.exports=function color(...args){
  var bg,r,g,b,s,col
  if(typeof args[0] === "string"){
    if(args[0].substr(0,1) === "#"){
      col = args[0]
    }else{
      col = colorNames[args[0]]
    }
    bg=args[1] || 0
    s=args[2] || 10
    r = parseInt(col.substr(1,2),16)
    g = parseInt(col.substr(3,2),16)
    b = parseInt(col.substr(5,2),16)
  }else{
    r=args[0]
    g=args[1]
    b=args[2]
    bg=args[3] || 0
    s=args[4] || 10
  }
  const l = bg? 48:38
  return `\x1b[${l};2;${r};${g};${b}m\x1b[${s}m`
}
