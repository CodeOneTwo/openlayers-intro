/* */ 
var isNumber = require('./isNumber');
var $isNaN = require('../number/isNaN');
function isNaN(val) {
  return !isNumber(val) || $isNaN(Number(val));
}
module.exports = isNaN;
