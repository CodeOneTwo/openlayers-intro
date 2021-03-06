/* */ 
(function() {
  var escope,
      expect,
      harmony;
  expect = require('chai').expect;
  harmony = require('../third_party/esprima');
  escope = require('../lib/index');
  describe('ES6 arrow function expression', function() {
    it('materialize scope for arrow function expression', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("var arrow = () => {\n    let i = 0;\n    var j = 20;\n    console.log(i);\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(1);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('ArrowFunctionExpression');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(2);
      expect(scope.variables[0].name).to.be.equal('i');
      return expect(scope.variables[1].name).to.be.equal('j');
    });
    return it('generate bindings for parameters', function() {
      var ast,
          scope,
          scopeManager;
      ast = harmony.parse("var arrow = (a, b, c, d) => {\n}");
      scopeManager = escope.analyze(ast, {ecmaVersion: 6});
      expect(scopeManager.scopes).to.have.length(2);
      scope = scopeManager.scopes[0];
      expect(scope.type).to.be.equal('global');
      expect(scope.block.type).to.be.equal('Program');
      expect(scope.isStrict).to.be["false"];
      expect(scope.variables).to.have.length(1);
      scope = scopeManager.scopes[1];
      expect(scope.type).to.be.equal('function');
      expect(scope.block.type).to.be.equal('ArrowFunctionExpression');
      expect(scope.isStrict).to.be["true"];
      expect(scope.variables).to.have.length(4);
      expect(scope.variables[0].name).to.be.equal('a');
      expect(scope.variables[1].name).to.be.equal('b');
      expect(scope.variables[2].name).to.be.equal('c');
      return expect(scope.variables[3].name).to.be.equal('d');
    });
  });
}).call(this);
