/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(worker, concurrency) {
    var q = (0, _queue2.default)(worker, concurrency);
    q.push = function(data, priority, callback) {
      if (callback == null)
        callback = _noop2.default;
      if (typeof callback !== 'function') {
        throw new Error('task callback must be a function');
      }
      q.started = true;
      if (!(0, _isArray2.default)(data)) {
        data = [data];
      }
      if (data.length === 0) {
        return (0, _setImmediate2.default)(function() {
          q.drain();
        });
      }
      priority = priority || 0;
      var nextNode = q._tasks.head;
      while (nextNode && priority >= nextNode.priority) {
        nextNode = nextNode.next;
      }
      for (var i = 0,
          l = data.length; i < l; i++) {
        var item = {
          data: data[i],
          priority: priority,
          callback: callback
        };
        if (nextNode) {
          q._tasks.insertBefore(nextNode, item);
        } else {
          q._tasks.push(item);
        }
      }
      (0, _setImmediate2.default)(q.process);
    };
    delete q.unshift;
    return q;
  };
  var _isArray = require('lodash/isArray');
  var _isArray2 = _interopRequireDefault(_isArray);
  var _noop = require('lodash/noop');
  var _noop2 = _interopRequireDefault(_noop);
  var _setImmediate = require('./setImmediate');
  var _setImmediate2 = _interopRequireDefault(_setImmediate);
  var _queue = require('./queue');
  var _queue2 = _interopRequireDefault(_queue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  module.exports = exports['default'];
})(require('process'));
