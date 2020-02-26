/* eslint-env mocha */
// const childProc = require('child_process')
const chai = require('chai')
chai.should()

// *************
// Write your tests here
describe('working-data', function () {
  // this.timeout(10000)

  // uncomment this if you want to raise the timeout cap for your whole test (when you need to perform long async tasks). You can also follow the same logic per describe block or per it block to increase the timeout cap
  // if your describe/it callbacks are arrow functions, you need to use the following syntax: describe('...', () => {}).timeout(4000)
})
// *************

// awaitable function to execute the main script of this action
// function execMain () {
//   return new Promise((resolve, reject) => {
//     childProc.exec('node index', (err, stdout, stderr) => {
//       if (err === null) {
//         console.log(stdout)
//         resolve(true)
//       } else {
//         console.log(stderr)
//         resolve(false)
//       }
//     })
//   })
// }

// just add any helpers you may need
