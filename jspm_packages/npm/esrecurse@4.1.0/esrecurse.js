/* */ 
(function() {
  'use strict';
  var assign,
      estraverse,
      isArray,
      objectKeys;
  assign = require('object-assign');
  estraverse = require('estraverse');
  isArray = Array.isArray || function isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]';
  };
  objectKeys = Object.keys || function(o) {
    var keys = [],
        key;
    for (key in o) {
      keys.push(key);
    }
    return keys;
  };
  function isNode(node) {
    if (node == null) {
      return false;
    }
    return typeof node === 'object' && typeof node.type === 'string';
  }
  function isProperty(nodeType, key) {
    return (nodeType === estraverse.Syntax.ObjectExpression || nodeType === estraverse.Syntax.ObjectPattern) && key === 'properties';
  }
  function Visitor(visitor, options) {
    options = options || {};
    this.__visitor = visitor || this;
    this.__childVisitorKeys = options.childVisitorKeys ? assign({}, estraverse.VisitorKeys, options.childVisitorKeys) : estraverse.VisitorKeys;
    if (options.fallback === 'iteration') {
      this.__fallback = objectKeys;
    } else if (typeof options.fallback === 'function') {
      this.__fallback = options.fallback;
    }
  }
  Visitor.prototype.visitChildren = function(node) {
    var type,
        children,
        i,
        iz,
        j,
        jz,
        child;
    if (node == null) {
      return;
    }
    type = node.type || estraverse.Syntax.Property;
    children = this.__childVisitorKeys[type];
    if (!children) {
      if (this.__fallback) {
        children = this.__fallback(node);
      } else {
        throw new Error('Unknown node type ' + type + '.');
      }
    }
    for (i = 0, iz = children.length; i < iz; ++i) {
      child = node[children[i]];
      if (child) {
        if (isArray(child)) {
          for (j = 0, jz = child.length; j < jz; ++j) {
            if (child[j]) {
              if (isNode(child[j]) || isProperty(type, children[i])) {
                this.visit(child[j]);
              }
            }
          }
        } else if (isNode(child)) {
          this.visit(child);
        }
      }
    }
  };
  Visitor.prototype.visit = function(node) {
    var type;
    if (node == null) {
      return;
    }
    type = node.type || estraverse.Syntax.Property;
    if (this.__visitor[type]) {
      this.__visitor[type].call(this, node);
      return;
    }
    this.visitChildren(node);
  };
  exports.version = require('./package.json!systemjs-json').version;
  exports.Visitor = Visitor;
  exports.visit = function(node, visitor, options) {
    var v = new Visitor(visitor, options);
    v.visit(node);
  };
}());
