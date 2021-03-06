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
  describe('global increment', function() {
    return it('becomes read/write', function() {
      var ast,
          globalScope,
          scopeManager;
      ast = esprima.parse("b++;");
      scopeManager = escope.analyze(ast);
      expect(scopeManager.scopes).to.have.length(1);
      globalScope = scopeManager.scopes[0];
      expect(globalScope.type).to.be.equal('global');
      expect(globalScope.variables).to.have.length(0);
      expect(globalScope.references).to.have.length(1);
      return expect(globalScope.references[0].isReadWrite()).to.be["true"];
    });
  });
}).call(this);
