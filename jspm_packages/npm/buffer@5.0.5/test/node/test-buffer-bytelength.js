/* */ 
'use strict';
var Buffer = require('../../../buffer@5.0.5.json!systemjs-json').Buffer;
var assert = require('assert');
var Buffer = require('../../../buffer@5.0.5.json!systemjs-json').Buffer;
var SlowBuffer = require('../../../buffer@5.0.5.json!systemjs-json').SlowBuffer;
assert.equal(Buffer.byteLength(32, 'latin1'), 2);
assert.equal(Buffer.byteLength(NaN, 'utf8'), 3);
assert.equal(Buffer.byteLength({}, 'latin1'), 15);
assert.equal(Buffer.byteLength(), 9);
var buff = new Buffer(10);
assert(ArrayBuffer.isView(buff));
var slowbuff = new SlowBuffer(10);
assert(ArrayBuffer.isView(slowbuff));
var incomplete = Buffer.from([0xe4, 0xb8, 0xad, 0xe6, 0x96]);
assert.equal(Buffer.byteLength(incomplete), 5);
var ascii = Buffer.from('abc');
assert.equal(Buffer.byteLength(ascii), 3);
var buffer = new ArrayBuffer(8);
assert.equal(Buffer.byteLength(buffer), 8);
var int8 = new Int8Array(8);
assert.equal(Buffer.byteLength(int8), 8);
var uint8 = new Uint8Array(8);
assert.equal(Buffer.byteLength(uint8), 8);
var uintc8 = new Uint8ClampedArray(2);
assert.equal(Buffer.byteLength(uintc8), 2);
var int16 = new Int16Array(8);
assert.equal(Buffer.byteLength(int16), 16);
var uint16 = new Uint16Array(8);
assert.equal(Buffer.byteLength(uint16), 16);
var int32 = new Int32Array(8);
assert.equal(Buffer.byteLength(int32), 32);
var uint32 = new Uint32Array(8);
assert.equal(Buffer.byteLength(uint32), 32);
var float32 = new Float32Array(8);
assert.equal(Buffer.byteLength(float32), 32);
var float64 = new Float64Array(8);
assert.equal(Buffer.byteLength(float64), 64);
var dv = new DataView(new ArrayBuffer(2));
assert.equal(Buffer.byteLength(dv), 2);
assert.equal(Buffer.byteLength('', 'ascii'), 0);
assert.equal(Buffer.byteLength('', 'HeX'), 0);
assert.equal(Buffer.byteLength('∑éllö wørl∂!', 'utf-8'), 19);
assert.equal(Buffer.byteLength('κλμνξο', 'utf8'), 12);
assert.equal(Buffer.byteLength('挵挶挷挸挹', 'utf-8'), 15);
assert.equal(Buffer.byteLength('𠝹𠱓𠱸', 'UTF8'), 12);
assert.equal(Buffer.byteLength('hey there'), 9);
assert.equal(Buffer.byteLength('𠱸挶νξ#xx :)'), 17);
assert.equal(Buffer.byteLength('hello world', ''), 11);
assert.equal(Buffer.byteLength('hello world', 'abc'), 11);
assert.equal(Buffer.byteLength('ßœ∑≈', 'unkn0wn enc0ding'), 10);
assert.equal(Buffer.byteLength('aGVsbG8gd29ybGQ=', 'base64'), 11);
assert.equal(Buffer.byteLength('bm9kZS5qcyByb2NrcyE=', 'base64'), 14);
assert.equal(Buffer.byteLength('aGkk', 'base64'), 3);
assert.equal(Buffer.byteLength('bHNrZGZsa3NqZmtsc2xrZmFqc2RsZmtqcw==', 'base64'), 25);
assert.equal(Buffer.byteLength('aaa=', 'base64'), 2);
assert.equal(Buffer.byteLength('aaaa==', 'base64'), 3);
assert.equal(Buffer.byteLength('Il était tué'), 14);
assert.equal(Buffer.byteLength('Il était tué', 'utf8'), 14);
assert.equal(Buffer.byteLength('Il était tué', 'ascii'), 12);
assert.equal(Buffer.byteLength('Il était tué', 'latin1'), 12);
assert.equal(Buffer.byteLength('Il était tué', 'binary'), 12);
['ucs2', 'ucs-2', 'utf16le', 'utf-16le'].forEach(function(encoding) {
  assert.equal(24, Buffer.byteLength('Il était tué', encoding));
});
