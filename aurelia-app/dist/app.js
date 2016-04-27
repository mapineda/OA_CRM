'use strict';

System.register([], function (_export, _context) {
  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Aurelia';
          config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztxQkFBYSxHOzs7OztzQkFDWCxlLDRCQUFnQixNLEVBQVEsTSxFQUFRO0FBQzlCLGlCQUFPLEtBQVAsR0FBZSxTQUFmO0FBQ0EsaUJBQU8sR0FBUCxDQUFXLENBQ1QsRUFBRSxPQUFPLENBQUMsRUFBRCxFQUFLLFNBQUwsQ0FBVCxFQUEwQixNQUFNLFNBQWhDLEVBQWdELFVBQVUsU0FBMUQsRUFBMEUsS0FBSyxJQUEvRSxFQUFxRixPQUFPLFNBQTVGLEVBRFMsRUFFVCxFQUFFLE9BQU8sT0FBVCxFQUEwQixNQUFNLE9BQWhDLEVBQWdELFVBQVUsT0FBMUQsRUFBMEUsS0FBSyxJQUEvRSxFQUFxRixPQUFPLGNBQTVGLEVBRlMsRUFHVCxFQUFFLE9BQU8sY0FBVCxFQUEwQixNQUFNLGNBQWhDLEVBQWdELFVBQVUsY0FBMUQsRUFBMEUsS0FBSyxJQUEvRSxFQUFxRixPQUFPLGNBQTVGLEVBSFMsQ0FBWDs7QUFNQSxlQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0QsUyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VSb290IjoiL3NyYyJ9
