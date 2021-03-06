/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _estraverse = require('estraverse');
  var _esrecurse = require('esrecurse');
  var _esrecurse2 = _interopRequireDefault(_esrecurse);
  var _reference = require('./reference');
  var _reference2 = _interopRequireDefault(_reference);
  var _variable = require('./variable');
  var _variable2 = _interopRequireDefault(_variable);
  var _patternVisitor = require('./pattern-visitor');
  var _patternVisitor2 = _interopRequireDefault(_patternVisitor);
  var _definition = require('./definition');
  var _assert = require('assert');
  var _assert2 = _interopRequireDefault(_assert);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function traverseIdentifierInPattern(options, rootPattern, referencer, callback) {
    var visitor = new _patternVisitor2.default(options, rootPattern, callback);
    visitor.visit(rootPattern);
    if (referencer != null) {
      visitor.rightHandNodes.forEach(referencer.visit, referencer);
    }
  }
  var Importer = function(_esrecurse$Visitor) {
    _inherits(Importer, _esrecurse$Visitor);
    function Importer(declaration, referencer) {
      _classCallCheck(this, Importer);
      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Importer).call(this, null, referencer.options));
      _this.declaration = declaration;
      _this.referencer = referencer;
      return _this;
    }
    _createClass(Importer, [{
      key: 'visitImport',
      value: function visitImport(id, specifier) {
        var _this2 = this;
        this.referencer.visitPattern(id, function(pattern) {
          _this2.referencer.currentScope().__define(pattern, new _definition.Definition(_variable2.default.ImportBinding, pattern, specifier, _this2.declaration, null, null));
        });
      }
    }, {
      key: 'ImportNamespaceSpecifier',
      value: function ImportNamespaceSpecifier(node) {
        var local = node.local || node.id;
        if (local) {
          this.visitImport(local, node);
        }
      }
    }, {
      key: 'ImportDefaultSpecifier',
      value: function ImportDefaultSpecifier(node) {
        var local = node.local || node.id;
        this.visitImport(local, node);
      }
    }, {
      key: 'ImportSpecifier',
      value: function ImportSpecifier(node) {
        var local = node.local || node.id;
        if (node.name) {
          this.visitImport(node.name, node);
        } else {
          this.visitImport(local, node);
        }
      }
    }]);
    return Importer;
  }(_esrecurse2.default.Visitor);
  var Referencer = function(_esrecurse$Visitor2) {
    _inherits(Referencer, _esrecurse$Visitor2);
    function Referencer(options, scopeManager) {
      _classCallCheck(this, Referencer);
      var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Referencer).call(this, null, options));
      _this3.options = options;
      _this3.scopeManager = scopeManager;
      _this3.parent = null;
      _this3.isInnerMethodDefinition = false;
      return _this3;
    }
    _createClass(Referencer, [{
      key: 'currentScope',
      value: function currentScope() {
        return this.scopeManager.__currentScope;
      }
    }, {
      key: 'close',
      value: function close(node) {
        while (this.currentScope() && node === this.currentScope().block) {
          this.scopeManager.__currentScope = this.currentScope().__close(this.scopeManager);
        }
      }
    }, {
      key: 'pushInnerMethodDefinition',
      value: function pushInnerMethodDefinition(isInnerMethodDefinition) {
        var previous = this.isInnerMethodDefinition;
        this.isInnerMethodDefinition = isInnerMethodDefinition;
        return previous;
      }
    }, {
      key: 'popInnerMethodDefinition',
      value: function popInnerMethodDefinition(isInnerMethodDefinition) {
        this.isInnerMethodDefinition = isInnerMethodDefinition;
      }
    }, {
      key: 'materializeTDZScope',
      value: function materializeTDZScope(node, iterationNode) {
        this.scopeManager.__nestTDZScope(node, iterationNode);
        this.visitVariableDeclaration(this.currentScope(), _variable2.default.TDZ, iterationNode.left, 0, true);
      }
    }, {
      key: 'materializeIterationScope',
      value: function materializeIterationScope(node) {
        var _this4 = this;
        var letOrConstDecl;
        this.scopeManager.__nestForScope(node);
        letOrConstDecl = node.left;
        this.visitVariableDeclaration(this.currentScope(), _variable2.default.Variable, letOrConstDecl, 0);
        this.visitPattern(letOrConstDecl.declarations[0].id, function(pattern) {
          _this4.currentScope().__referencing(pattern, _reference2.default.WRITE, node.right, null, true, true);
        });
      }
    }, {
      key: 'referencingDefaultValue',
      value: function referencingDefaultValue(pattern, assignments, maybeImplicitGlobal, init) {
        var scope = this.currentScope();
        assignments.forEach(function(assignment) {
          scope.__referencing(pattern, _reference2.default.WRITE, assignment.right, maybeImplicitGlobal, pattern !== assignment.left, init);
        });
      }
    }, {
      key: 'visitPattern',
      value: function visitPattern(node, options, callback) {
        if (typeof options === 'function') {
          callback = options;
          options = {processRightHandNodes: false};
        }
        traverseIdentifierInPattern(this.options, node, options.processRightHandNodes ? this : null, callback);
      }
    }, {
      key: 'visitFunction',
      value: function visitFunction(node) {
        var _this5 = this;
        var i,
            iz;
        if (node.type === _estraverse.Syntax.FunctionDeclaration) {
          this.currentScope().__define(node.id, new _definition.Definition(_variable2.default.FunctionName, node.id, node, null, null, null));
        }
        if (node.type === _estraverse.Syntax.FunctionExpression && node.id) {
          this.scopeManager.__nestFunctionExpressionNameScope(node);
        }
        this.scopeManager.__nestFunctionScope(node, this.isInnerMethodDefinition);
        for (i = 0, iz = node.params.length; i < iz; ++i) {
          this.visitPattern(node.params[i], {processRightHandNodes: true}, function(pattern, info) {
            _this5.currentScope().__define(pattern, new _definition.ParameterDefinition(pattern, node, i, info.rest));
            _this5.referencingDefaultValue(pattern, info.assignments, null, true);
          });
        }
        if (node.rest) {
          this.visitPattern({
            type: 'RestElement',
            argument: node.rest
          }, function(pattern) {
            _this5.currentScope().__define(pattern, new _definition.ParameterDefinition(pattern, node, node.params.length, true));
          });
        }
        if (node.body.type === _estraverse.Syntax.BlockStatement) {
          this.visitChildren(node.body);
        } else {
          this.visit(node.body);
        }
        this.close(node);
      }
    }, {
      key: 'visitClass',
      value: function visitClass(node) {
        if (node.type === _estraverse.Syntax.ClassDeclaration) {
          this.currentScope().__define(node.id, new _definition.Definition(_variable2.default.ClassName, node.id, node, null, null, null));
        }
        this.visit(node.superClass);
        this.scopeManager.__nestClassScope(node);
        if (node.id) {
          this.currentScope().__define(node.id, new _definition.Definition(_variable2.default.ClassName, node.id, node));
        }
        this.visit(node.body);
        this.close(node);
      }
    }, {
      key: 'visitProperty',
      value: function visitProperty(node) {
        var previous,
            isMethodDefinition;
        if (node.computed) {
          this.visit(node.key);
        }
        isMethodDefinition = node.type === _estraverse.Syntax.MethodDefinition;
        if (isMethodDefinition) {
          previous = this.pushInnerMethodDefinition(true);
        }
        this.visit(node.value);
        if (isMethodDefinition) {
          this.popInnerMethodDefinition(previous);
        }
      }
    }, {
      key: 'visitForIn',
      value: function visitForIn(node) {
        var _this6 = this;
        if (node.left.type === _estraverse.Syntax.VariableDeclaration && node.left.kind !== 'var') {
          this.materializeTDZScope(node.right, node);
          this.visit(node.right);
          this.close(node.right);
          this.materializeIterationScope(node);
          this.visit(node.body);
          this.close(node);
        } else {
          if (node.left.type === _estraverse.Syntax.VariableDeclaration) {
            this.visit(node.left);
            this.visitPattern(node.left.declarations[0].id, function(pattern) {
              _this6.currentScope().__referencing(pattern, _reference2.default.WRITE, node.right, null, true, true);
            });
          } else {
            this.visitPattern(node.left, {processRightHandNodes: true}, function(pattern, info) {
              var maybeImplicitGlobal = null;
              if (!_this6.currentScope().isStrict) {
                maybeImplicitGlobal = {
                  pattern: pattern,
                  node: node
                };
              }
              _this6.referencingDefaultValue(pattern, info.assignments, maybeImplicitGlobal, false);
              _this6.currentScope().__referencing(pattern, _reference2.default.WRITE, node.right, maybeImplicitGlobal, true, false);
            });
          }
          this.visit(node.right);
          this.visit(node.body);
        }
      }
    }, {
      key: 'visitVariableDeclaration',
      value: function visitVariableDeclaration(variableTargetScope, type, node, index, fromTDZ) {
        var _this7 = this;
        var decl,
            init;
        decl = node.declarations[index];
        init = decl.init;
        this.visitPattern(decl.id, {processRightHandNodes: !fromTDZ}, function(pattern, info) {
          variableTargetScope.__define(pattern, new _definition.Definition(type, pattern, decl, node, index, node.kind));
          if (!fromTDZ) {
            _this7.referencingDefaultValue(pattern, info.assignments, null, true);
          }
          if (init) {
            _this7.currentScope().__referencing(pattern, _reference2.default.WRITE, init, null, !info.topLevel, true);
          }
        });
      }
    }, {
      key: 'AssignmentExpression',
      value: function AssignmentExpression(node) {
        var _this8 = this;
        if (_patternVisitor2.default.isPattern(node.left)) {
          if (node.operator === '=') {
            this.visitPattern(node.left, {processRightHandNodes: true}, function(pattern, info) {
              var maybeImplicitGlobal = null;
              if (!_this8.currentScope().isStrict) {
                maybeImplicitGlobal = {
                  pattern: pattern,
                  node: node
                };
              }
              _this8.referencingDefaultValue(pattern, info.assignments, maybeImplicitGlobal, false);
              _this8.currentScope().__referencing(pattern, _reference2.default.WRITE, node.right, maybeImplicitGlobal, !info.topLevel, false);
            });
          } else {
            this.currentScope().__referencing(node.left, _reference2.default.RW, node.right);
          }
        } else {
          this.visit(node.left);
        }
        this.visit(node.right);
      }
    }, {
      key: 'CatchClause',
      value: function CatchClause(node) {
        var _this9 = this;
        this.scopeManager.__nestCatchScope(node);
        this.visitPattern(node.param, {processRightHandNodes: true}, function(pattern, info) {
          _this9.currentScope().__define(pattern, new _definition.Definition(_variable2.default.CatchClause, node.param, node, null, null, null));
          _this9.referencingDefaultValue(pattern, info.assignments, null, true);
        });
        this.visit(node.body);
        this.close(node);
      }
    }, {
      key: 'Program',
      value: function Program(node) {
        this.scopeManager.__nestGlobalScope(node);
        if (this.scopeManager.__isNodejsScope()) {
          this.currentScope().isStrict = false;
          this.scopeManager.__nestFunctionScope(node, false);
        }
        if (this.scopeManager.__isES6() && this.scopeManager.isModule()) {
          this.scopeManager.__nestModuleScope(node);
        }
        if (this.scopeManager.isStrictModeSupported() && this.scopeManager.isImpliedStrict()) {
          this.currentScope().isStrict = true;
        }
        this.visitChildren(node);
        this.close(node);
      }
    }, {
      key: 'Identifier',
      value: function Identifier(node) {
        this.currentScope().__referencing(node);
      }
    }, {
      key: 'UpdateExpression',
      value: function UpdateExpression(node) {
        if (_patternVisitor2.default.isPattern(node.argument)) {
          this.currentScope().__referencing(node.argument, _reference2.default.RW, null);
        } else {
          this.visitChildren(node);
        }
      }
    }, {
      key: 'MemberExpression',
      value: function MemberExpression(node) {
        this.visit(node.object);
        if (node.computed) {
          this.visit(node.property);
        }
      }
    }, {
      key: 'Property',
      value: function Property(node) {
        this.visitProperty(node);
      }
    }, {
      key: 'MethodDefinition',
      value: function MethodDefinition(node) {
        this.visitProperty(node);
      }
    }, {
      key: 'BreakStatement',
      value: function BreakStatement() {}
    }, {
      key: 'ContinueStatement',
      value: function ContinueStatement() {}
    }, {
      key: 'LabeledStatement',
      value: function LabeledStatement(node) {
        this.visit(node.body);
      }
    }, {
      key: 'ForStatement',
      value: function ForStatement(node) {
        if (node.init && node.init.type === _estraverse.Syntax.VariableDeclaration && node.init.kind !== 'var') {
          this.scopeManager.__nestForScope(node);
        }
        this.visitChildren(node);
        this.close(node);
      }
    }, {
      key: 'ClassExpression',
      value: function ClassExpression(node) {
        this.visitClass(node);
      }
    }, {
      key: 'ClassDeclaration',
      value: function ClassDeclaration(node) {
        this.visitClass(node);
      }
    }, {
      key: 'CallExpression',
      value: function CallExpression(node) {
        if (!this.scopeManager.__ignoreEval() && node.callee.type === _estraverse.Syntax.Identifier && node.callee.name === 'eval') {
          this.currentScope().variableScope.__detectEval();
        }
        this.visitChildren(node);
      }
    }, {
      key: 'BlockStatement',
      value: function BlockStatement(node) {
        if (this.scopeManager.__isES6()) {
          this.scopeManager.__nestBlockScope(node);
        }
        this.visitChildren(node);
        this.close(node);
      }
    }, {
      key: 'ThisExpression',
      value: function ThisExpression() {
        this.currentScope().variableScope.__detectThis();
      }
    }, {
      key: 'WithStatement',
      value: function WithStatement(node) {
        this.visit(node.object);
        this.scopeManager.__nestWithScope(node);
        this.visit(node.body);
        this.close(node);
      }
    }, {
      key: 'VariableDeclaration',
      value: function VariableDeclaration(node) {
        var variableTargetScope,
            i,
            iz,
            decl;
        variableTargetScope = node.kind === 'var' ? this.currentScope().variableScope : this.currentScope();
        for (i = 0, iz = node.declarations.length; i < iz; ++i) {
          decl = node.declarations[i];
          this.visitVariableDeclaration(variableTargetScope, _variable2.default.Variable, node, i);
          if (decl.init) {
            this.visit(decl.init);
          }
        }
      }
    }, {
      key: 'SwitchStatement',
      value: function SwitchStatement(node) {
        var i,
            iz;
        this.visit(node.discriminant);
        if (this.scopeManager.__isES6()) {
          this.scopeManager.__nestSwitchScope(node);
        }
        for (i = 0, iz = node.cases.length; i < iz; ++i) {
          this.visit(node.cases[i]);
        }
        this.close(node);
      }
    }, {
      key: 'FunctionDeclaration',
      value: function FunctionDeclaration(node) {
        this.visitFunction(node);
      }
    }, {
      key: 'FunctionExpression',
      value: function FunctionExpression(node) {
        this.visitFunction(node);
      }
    }, {
      key: 'ForOfStatement',
      value: function ForOfStatement(node) {
        this.visitForIn(node);
      }
    }, {
      key: 'ForInStatement',
      value: function ForInStatement(node) {
        this.visitForIn(node);
      }
    }, {
      key: 'ArrowFunctionExpression',
      value: function ArrowFunctionExpression(node) {
        this.visitFunction(node);
      }
    }, {
      key: 'ImportDeclaration',
      value: function ImportDeclaration(node) {
        var importer;
        (0, _assert2.default)(this.scopeManager.__isES6() && this.scopeManager.isModule(), 'ImportDeclaration should appear when the mode is ES6 and in the module context.');
        importer = new Importer(node, this);
        importer.visit(node);
      }
    }, {
      key: 'visitExportDeclaration',
      value: function visitExportDeclaration(node) {
        if (node.source) {
          return;
        }
        if (node.declaration) {
          this.visit(node.declaration);
          return;
        }
        this.visitChildren(node);
      }
    }, {
      key: 'ExportDeclaration',
      value: function ExportDeclaration(node) {
        this.visitExportDeclaration(node);
      }
    }, {
      key: 'ExportNamedDeclaration',
      value: function ExportNamedDeclaration(node) {
        this.visitExportDeclaration(node);
      }
    }, {
      key: 'ExportSpecifier',
      value: function ExportSpecifier(node) {
        var local = node.id || node.local;
        this.visit(local);
      }
    }, {
      key: 'MetaProperty',
      value: function MetaProperty() {}
    }]);
    return Referencer;
  }(_esrecurse2.default.Visitor);
  exports.default = Referencer;
})(require('process'));
