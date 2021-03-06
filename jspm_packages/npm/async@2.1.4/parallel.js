/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = parallelLimit;
var _eachOf = require('./eachOf');
var _eachOf2 = _interopRequireDefault(_eachOf);
var _parallel = require('./internal/parallel');
var _parallel2 = _interopRequireDefault(_parallel);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function parallelLimit(tasks, callback) {
  (0, _parallel2.default)(_eachOf2.default, tasks, callback);
}
module.exports = exports['default'];
