/* */ 
var toString = require('../lang/toString');
function normalizeLineBreaks(str, lineEnd) {
  str = toString(str);
  lineEnd = lineEnd || '\n';
  return str.replace(/\r\n/g, lineEnd).replace(/\r/g, lineEnd).replace(/\n/g, lineEnd);
}
module.exports = normalizeLineBreaks;
