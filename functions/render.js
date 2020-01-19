const puppeteer = require('puppeteer');
const fs = require("fs")
module.exports=async function(...args){
  {
    var options = extractArgs(...args)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.goto('http://localhost:1234/example/index.html');
    await page.setViewport({
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
      fullPage: true,
    });
    if(!fs.existsSync("./screenshots")){
      fs.mkdirSync("./screenshots")
    }
    const elem = await page.$$(options.element);
    console.log(await page.content())
    for(var i = 0;i<elem.length;i++){
      const res = await elem[i].updateComplete;
      await elem[i].screenshot({path: `./screenshots/${i}.png`})
    }
   await browser.close();
 }
}

function extractArgs(args){
  let res = {}
  for(var i=0;i<args.length;i++){
    let currentArg = args[i]
    switch(currentArg){
      case "--element":
      case "-e":
        i++
        res.element = args[i]
      break
    }
  }
  return res
}
