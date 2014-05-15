tap-file
==========

Mocha TAP reporter, with added capability of storing results in a file

# How to use

1. Add "tap-file" to your package.json as a devDependency
2. Run mocha with `-R tap-file` or `--reporter tap-file`


The tap output file is saved to the file given in the TAP_FILE environment variable, or process.cwd()/results.tap

> TAP_FILE=output/results.tap mocha -R xunit-file



# Credits
1. This reporter is heavily inspired from [xunit-file](https://github.com/peerigon/xunit-file)
2. This reporter is just the original [tap reporter](https://github.com/visionmedia/mocha/blob/master/lib/reporters/tap.js) from mocha, only writing the result in a file.

