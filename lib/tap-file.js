
/**
 * Module dependencies.
 */

var mocha = require("mocha")
  , Base = mocha.reporters.Base
  , cursor = Base.cursor
  , color = Base.color
  , fs = require("fs")
  , filePath = process.env.TAP_FILE || process.cwd() + "/results.tap"
  , fd = fs.openSync(filePath, 'w', 0755)

/**
 * Expose `TAP-FILE`.
 */

exports = module.exports = TapFile;

/**
 * Initialize a new `TapFile` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function TapFile(runner) {
  Base.call(this, runner);

  var self = this
    , stats = this.stats
    , n = 1
    , passes = 0
    , failures = 0;

  runner.on('start', function(){
    var total = runner.grepTotal(runner.suite);
    console.log('%d..%d', 1, total);
    appendLine("1.." + total);

  });

  runner.on('test end', function(){
    ++n;
  });

  runner.on('pending', function(test){
    console.log('ok %d %s # SKIP -', n, title(test));
    appendLine("ok " + n + " " + title(test) + " # SKIP -");
  });

  runner.on('pass', function(test){
    var line =
    passes++;
    console.log('ok %d %s', n, title(test));
    appendLine("ok " + n + " " + title(test));
  });

  runner.on('fail', function(test, err){
    failures++;
    console.log('not ok %d %s', n, title(test));
    appendLine("not ok " + n + " " + title(test));
    if (err.stack) {
        console.log(err.stack.replace(/^/gm, '  '));
        appendLine(err.stack.replace(/^/gm, '  '));
    }
  });

  runner.on('end', function(){
    console.log('# tests ' + (passes + failures));
    console.log('# pass ' + passes);
    console.log('# fail ' + failures);

    appendLine('# tests ' + (passes + failures));
    appendLine('# pass ' + passes);
    appendLine('# fail ' + failures);
    fs.closeSync(fd);
  });
}

/**
 * Return a TAP-safe title of `test`
 *
 * @param {Object} test
 * @return {String}
 * @api private
 */

function title(test) {
  return test.fullTitle().replace(/#/g, '');
}



function appendLine(line) {
    fs.writeSync(fd, line + "\n", null, 'utf8');
}