/* */ 
var lerp = require('./lerp');
var norm = require('./norm');
function map(val, min1, max1, min2, max2) {
  return lerp(norm(val, min1, max1), min2, max2);
}
module.exports = map;
