/* */ 
(function() {
  var escope,
      esprima,
      expect,
      harmony;
  expect = require('chai').expect;
  esprima = require('esprima');
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('label', function() {
    it('should not create variables', function() {
      var ast,
          globalScope,
          scope,
          scopeManager;
      ast = esprima.parse("function bar() { q: for(;;) { break q; } }");
      scopeManager = escope.analyze(ast);
      expect(scopeManager.scopes).to.have.length(2);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(1);
      expect(globalScope.variables[0].name).to.be.equal('bar');
      expect(globalScope.references).to.have.length(0);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.variables).to.have.length(1);
      expect(scope.variables[0].name).to.be.equal('arguments');
      expect(scope.isArgumentsMaterialized()).to.be["false"];
      return expect(scope.references).to.have.length(0);
    });
    return it('should count child node references', function() {
      var ast,
          globalScope,
          scopeManager;
      ast = esprima.parse("var foo = 5;\n\nlabel: while (true) {\n  console.log(foo);\n  break;\n}");
      scopeManager = escope.analyze(ast);
      expect(scopeManager.scopes).to.have.length(1);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(1);
      expect(globalScope.variables[0].name).to.be.equal('foo');
      expect(globalScope.through.length).to.be.equal(3);
      expect(globalScope.through[2].identifier.name).to.be.equal('foo');
      return expect(globalScope.through[2].isRead()).to.be["true"];
    });
  });
}).call(this);
