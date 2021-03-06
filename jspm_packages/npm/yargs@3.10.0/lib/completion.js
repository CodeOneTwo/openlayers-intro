/* */ 
(function(process) {
  var fs = require('fs'),
      path = require('path');
  module.exports = function(yargs, usage) {
    var self = {completionKey: 'get-yargs-completions'};
    self.getCompletion = function(done) {
      var completions = [],
          current = process.argv[process.argv.length - 1],
          previous = process.argv.slice(process.argv.indexOf('--' + self.completionKey) + 1),
          argv = yargs.parse(previous);
      if (completionFunction) {
        if (completionFunction.length < 3) {
          return done(completionFunction(current, argv));
        } else {
          return completionFunction(current, argv, function(completions) {
            done(completions);
          });
        }
      }
      if (!current.match(/^-/)) {
        usage.getCommands().forEach(function(command) {
          completions.push(command[0]);
        });
      }
      if (current.match(/^-/)) {
        Object.keys(yargs.getOptions().key).forEach(function(key) {
          completions.push('--' + key);
        });
      }
      done(completions);
    };
    self.generateCompletionScript = function($0) {
      var script = fs.readFileSync(path.resolve(__dirname, '../completion.sh.hbs'), 'utf-8'),
          name = path.basename($0);
      if ($0.match(/\.js$/))
        $0 = './' + $0;
      script = script.replace(/{{app_name}}/g, name);
      return script.replace(/{{app_path}}/g, $0);
    };
    var completionFunction = null;
    self.registerFunction = function(fn) {
      completionFunction = fn;
    };
    return self;
  };
})(require('process'));
