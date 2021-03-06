/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = timeout;
  var _initialParams = require('./internal/initialParams');
  var _initialParams2 = _interopRequireDefault(_initialParams);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function timeout(asyncFn, milliseconds, info) {
    var originalCallback,
        timer;
    var timedOut = false;
    function injectedCallback() {
      if (!timedOut) {
        originalCallback.apply(null, arguments);
        clearTimeout(timer);
      }
    }
    function timeoutCallback() {
      var name = asyncFn.name || 'anonymous';
      var error = new Error('Callback function "' + name + '" timed out.');
      error.code = 'ETIMEDOUT';
      if (info) {
        error.info = info;
      }
      timedOut = true;
      originalCallback(error);
    }
    return (0, _initialParams2.default)(function(args, origCallback) {
      originalCallback = origCallback;
      timer = setTimeout(timeoutCallback, milliseconds);
      asyncFn.apply(null, args.concat(injectedCallback));
    });
  }
  module.exports = exports['default'];
})(require('process'));
