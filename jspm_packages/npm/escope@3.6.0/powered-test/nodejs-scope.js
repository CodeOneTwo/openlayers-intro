/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('nodejsScope option', function() {
    it('creates a function scope following the global scope immediately', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("'use strict';\nvar hello = 20;");
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        nodejsScope: true
      });
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('arguments');
      return expect(scope.variables[1].name).to.be.equal('hello');
    });
    return it('creates a function scope following the global scope immediately and creates module scope', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("import {x as v} from \"mod\";", {sourceType: 'module'});
      scopeManager = escope.analyze(ast, {
        ecmaVersion: 6,
        nodejsScope: true,
        sourceType: 'module'
      });
      expect(scopeManager.scopes).to.have.length(3);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      scope = scopeManager.scopes[2];
      expect(scope.type).to.be.equal('module');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('v');
      expect(scope.variables[0].defs[0].type).to.be.equal('ImportBinding');
      return expect(scope.references).to.have.length(0);
    });
  });
}).call(this);
