/* */ 
var toString = require('../lang/toString');
function stripHtmlTags(str) {
  str = toString(str);
  return str.replace(/<[^>]*>/g, '');
}
module.exports = stripHtmlTags;
