/* */ 
var kindOf = require('./kindOf');
function isKind(val, kind) {
  return kindOf(val) === kind;
}
module.exports = isKind;
