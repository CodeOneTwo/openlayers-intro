/* */ 
'use strict';
if (!require('./is-implemented')()) {
  Object.defineProperty(Array.prototype, 'map', {
    value: require('./shim'),
    configurable: true,
    enumerable: false,
    writable: true
  });
}
