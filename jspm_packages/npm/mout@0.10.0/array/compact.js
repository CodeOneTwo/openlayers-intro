/* */ 
var filter = require('./filter');
function compact(arr) {
  return filter(arr, function(val) {
    return (val != null);
  });
}
module.exports = compact;
