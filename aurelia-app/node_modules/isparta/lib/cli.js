//

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _module2 = require('module');

var _module3 = _interopRequireDefault(_module2);

//

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _which = require('which');

var _which2 = _interopRequireDefault(_which);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _lodashPartial = require('lodash.partial');

var _lodashPartial2 = _interopRequireDefault(_lodashPartial);

var _nomnomnomnom = require('nomnomnomnom');

var _nomnomnomnom2 = _interopRequireDefault(_nomnomnomnom);

var _istanbul = require('istanbul');

var _instrumenter = require('./instrumenter');

//

//

_nomnomnomnom2['default'].command('cover').help("transparently adds coverage information to a node command. Saves coverage.json and reports at the end of execution").option('cmd', {
  required: true,
  position: 1,
  help: 'ES6 js files to cover (using babel)'
}).option('config', {
  metavar: '<path-to-config>',
  help: 'the configuration file to use, defaults to .istanbul.yml'
}).option('default-excludes', {
  flag: true,
  help: 'apply default excludes [ **/node_modules/**, **/test/**, **/tests/** ]'
}).option('excludes', {
  abbr: 'x',
  'default': [],
  help: 'one or more fileset patterns e.g. "**/vendor/**"',
  list: true,
  metavar: '<exclude-pattern>'
}).option('report', {
  'default': 'lcv',
  metavar: '<format>',
  list: true,
  help: 'report format'
}).option('root', {
  metavar: '<path>',
  help: 'the root path to look for files to instrument'
}).option('include', {
  'default': ['**/*.js'],
  metavar: '<include-pattern>',
  list: true,
  abbr: 'i',
  help: 'one or more fileset patterns e.g. \'**/*.js\''
}).option('verbose', {
  flag: true,
  abbr: 'v',
  help: 'verbose mode'
}).option('include-all-sources', {
  flag: true,
  help: 'instrument all unused sources after running tests'
}).callback(function (opts) {

  var args = opts._,
      files = [],
      cmdArgs = [];

  args.forEach(function (arg) {

    var file = lookupFiles(arg);
    if (file) files = files.concat(file);
  });

  opts.include = opts.include.concat(files);

  coverCmd(opts);
});
;

_nomnomnomnom2['default'].nom();

function lookupFiles(path) {

  if ((0, _fs.existsSync)(path)) {
    var stat = (0, _fs.statSync)(path);
    if (stat.isFile()) return path;
  }
}

function callback(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
}

function coverCmd(opts) {

  var config = overrideConfigWith(opts);
  var istanbulCoveragePath = _path2['default'].resolve(config.reporting.dir());
  var reporter = new _istanbul.Reporter(config, istanbulCoveragePath);

  var cmd = opts.cmd;

  var cmdArgs = opts['--'] || [];

  if (!(0, _fs.existsSync)(cmd)) {
    try {
      cmd = _which2['default'].sync(cmd);
    } catch (ex) {
      return callback('Unable to resolve file [' + cmd + ']');
    }
  } else {
    cmd = _path2['default'].resolve(cmd);
  }

  if (opts.verbose) console.error('Isparta options : \n ', opts);

  var excludes = config.instrumentation.excludes(true);
  enableHooks();

  ////

  function overrideConfigWith(opts) {
    var overrides = {
      verbose: opts.verbose,
      instrumentation: {
        root: opts.root,
        'default-excludes': opts['default-excludes'],
        excludes: opts.excludes,
        'include-all-sources': opts['include-all-sources'],
        // preload-sources is deprecated
        // TODO(douglasduteil): remove this option
        'preload-sources': opts['preload-sources']
      },
      reporting: {
        reports: opts.report,
        print: opts.print,
        dir: opts.dir
      },
      hooks: {
        'hook-run-in-context': opts['hook-run-in-context'],
        'post-require-hook': opts['post-require-hook'],
        'handle-sigint': opts['handle-sigint']
      }
    };

    return _istanbul.config.loadFile(opts.config, overrides);
  }

  function enableHooks() {
    opts.reportingDir = _path2['default'].resolve(config.reporting.dir());
    _mkdirp2['default'].sync(opts.reportingDir);
    reporter.addAll(config.reporting.reports());

    if (config.reporting.print() !== 'none') {
      switch (config.reporting.print()) {
        case 'detail':
          reporter.add('text');
          break;
        case 'both':
          reporter.add('text');
          reporter.add('text-summary');
          break;
        default:
          reporter.add('text-summary');
          break;
      }
    }

    excludes.push(_path2['default'].relative(process.cwd(), _path2['default'].join(opts.reportingDir, '**', '*')));

    (0, _istanbul.matcherFor)({
      root: config.instrumentation.root() || process.cwd(),
      includes: opts.include || config.instrumentation.extensions().map(function (ext) {
        return '**/*' + ext;
      }),
      excludes: excludes
    }, function (err, matchFn) {
      if (err) {
        return callback(err);
      }

      prepareCoverage(matchFn);
      runCommandFn();
    });
  }

  function prepareCoverage(matchFn) {
    var coverageVar = '$$cov_' + Date.now() + '$$';
    var instrumenter = new _instrumenter.Instrumenter({ coverageVariable: coverageVar });
    var transformer = instrumenter.instrumentSync.bind(instrumenter);

    _istanbul.hook.hookRequire(matchFn, transformer, (0, _objectAssign2['default'])({ verbose: opts.verbose }, config.instrumentation.config));

    global[coverageVar] = {};

    if (config.hooks.handleSigint()) {
      process.once('SIGINT', process.exit);
    }

    process.once('exit', function (code) {
      if (code) {
        process.exit(code);
      }
      var file = _path2['default'].resolve(opts.reportingDir, 'coverage.json');
      var cov = undefined,
          collector = undefined;

      if (typeof global[coverageVar] === 'undefined' || Object.keys(global[coverageVar]).length === 0) {
        console.error('No coverage information was collected, exit without writing coverage information');
        return;
      } else {
        cov = global[coverageVar];
      }

      _mkdirp2['default'].sync(opts.reportingDir);
      if (config.reporting.print() !== 'none') {
        console.error(Array(80 + 1).join('='));
        console.error('Writing coverage object [' + file + ']');
      }
      (0, _fs.writeFileSync)(file, JSON.stringify(cov), 'utf8');
      collector = new _istanbul.Collector();
      collector.add(cov);
      if (config.reporting.print() !== 'none') {
        console.error('Writing coverage reports at [' + opts.reportingDir + ']');
        console.error(Array(80 + 1).join('='));
      }
      reporter.write(collector, true, callback);
    });

    if (config.instrumentation.includeAllSources()) {
      matchFn.files.forEach(function (file) {
        if (opts.verbose) {
          console.error('Preload ' + file);
        }
        try {
          require(file);
        } catch (ex) {
          if (opts.verbose) {
            console.error('Unable to preload ' + file);
          }
          // swallow
        }
      });
    }
  }

  function runCommandFn() {
    process.argv = ["node", cmd].concat(cmdArgs);
    if (opts.verbose) {
      console.log('Running: ' + process.argv.join(' '));
    }
    process.env.running_under_istanbul = 1;
    _module3['default'].runMain(cmd, null, true);
  }
}