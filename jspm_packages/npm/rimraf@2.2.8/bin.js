/* */ 
(function(process) {
  var rimraf = require('../rimraf@2.2.8.json!systemjs-json');
  var help = false;
  var dashdash = false;
  var args = process.argv.slice(2).filter(function(arg) {
    if (dashdash)
      return !!arg;
    else if (arg === '--')
      dashdash = true;
    else if (arg.match(/^(-+|\/)(h(elp)?|\?)$/))
      help = true;
    else
      return !!arg;
  });
  if (help || args.length === 0) {
    var log = help ? console.log : console.error;
    log('Usage: rimraf <path>');
    log('');
    log('  Deletes all files and folders at "path" recursively.');
    log('');
    log('Options:');
    log('');
    log('  -h, --help    Display this usage info');
    process.exit(help ? 0 : 1);
  } else {
    args.forEach(function(arg) {
      rimraf.sync(arg);
    });
  }
})(require('process'));
