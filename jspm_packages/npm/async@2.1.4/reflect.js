/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = reflect;
var _initialParams = require('./internal/initialParams');
var _initialParams2 = _interopRequireDefault(_initialParams);
var _rest = require('./internal/rest');
var _rest2 = _interopRequireDefault(_rest);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function reflect(fn) {
  return (0, _initialParams2.default)(function reflectOn(args, reflectCallback) {
    args.push((0, _rest2.default)(function callback(err, cbArgs) {
      if (err) {
        reflectCallback(null, {error: err});
      } else {
        var value = null;
        if (cbArgs.length === 1) {
          value = cbArgs[0];
        } else if (cbArgs.length > 1) {
          value = cbArgs;
        }
        reflectCallback(null, {value: value});
      }
    }));
    return fn.apply(this, args);
  });
}
module.exports = exports['default'];
