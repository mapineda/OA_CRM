'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _istanbul = require('istanbul');

_defaults(exports, _interopExportWildcard(_istanbul, _defaults));

var _instrumenter = require('./instrumenter');

Object.defineProperty(exports, 'Instrumenter', {
  enumerable: true,
  get: function get() {
    return _instrumenter.Instrumenter;
  }
});

var _packageJson = require('../package.json');

Object.defineProperty(exports, 'VERSION', {
  enumerable: true,
  get: function get() {
    return _packageJson.VERSION;
  }
});