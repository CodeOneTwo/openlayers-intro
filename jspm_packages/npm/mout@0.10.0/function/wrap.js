/* */ 
var partial = require('./partial');
function wrap(fn, wrapper) {
  return partial(wrapper, fn);
}
module.exports = wrap;
