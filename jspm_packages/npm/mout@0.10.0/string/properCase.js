/* */ 
var toString = require('../lang/toString');
var lowerCase = require('./lowerCase');
var upperCase = require('./upperCase');
function properCase(str) {
  str = toString(str);
  return lowerCase(str).replace(/^\w|\s\w/g, upperCase);
}
module.exports = properCase;
