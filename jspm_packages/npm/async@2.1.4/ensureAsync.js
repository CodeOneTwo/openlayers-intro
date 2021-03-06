/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = ensureAsync;
var _setImmediate = require('./internal/setImmediate');
var _setImmediate2 = _interopRequireDefault(_setImmediate);
var _initialParams = require('./internal/initialParams');
var _initialParams2 = _interopRequireDefault(_initialParams);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function ensureAsync(fn) {
  return (0, _initialParams2.default)(function(args, callback) {
    var sync = true;
    args.push(function() {
      var innerArgs = arguments;
      if (sync) {
        (0, _setImmediate2.default)(function() {
          callback.apply(null, innerArgs);
        });
      } else {
        callback.apply(null, innerArgs);
      }
    });
    fn.apply(this, args);
    sync = false;
  });
}
module.exports = exports['default'];
