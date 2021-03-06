/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
exports.default = sortBy;
var _arrayMap = require('lodash/_arrayMap');
var _arrayMap2 = _interopRequireDefault(_arrayMap);
var _baseProperty = require('lodash/_baseProperty');
var _baseProperty2 = _interopRequireDefault(_baseProperty);
var _map = require('./map');
var _map2 = _interopRequireDefault(_map);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function sortBy(coll, iteratee, callback) {
  (0, _map2.default)(coll, function(x, callback) {
    iteratee(x, function(err, criteria) {
      if (err)
        return callback(err);
      callback(null, {
        value: x,
        criteria: criteria
      });
    });
  }, function(err, results) {
    if (err)
      return callback(err);
    callback(null, (0, _arrayMap2.default)(results.sort(comparator), (0, _baseProperty2.default)('value')));
  });
  function comparator(left, right) {
    var a = left.criteria,
        b = right.criteria;
    return a < b ? -1 : a > b ? 1 : 0;
  }
}
module.exports = exports['default'];
