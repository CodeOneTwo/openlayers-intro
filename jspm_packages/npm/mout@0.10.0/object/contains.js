/* */ 
var some = require('./some');
function contains(obj, needle) {
  return some(obj, function(val) {
    return (val === needle);
  });
}
module.exports = contains;
