/* */ 
var randBool = require('./randBool');
function randomBit() {
  return randBool() ? 1 : 0;
}
module.exports = randomBit;
