/* */ 
var has = require('./has');
function unset(obj, prop) {
  if (has(obj, prop)) {
    var parts = prop.split('.'),
        last = parts.pop();
    while (prop = parts.shift()) {
      obj = obj[prop];
    }
    return (delete obj[last]);
  } else {
    return true;
  }
}
module.exports = unset;
