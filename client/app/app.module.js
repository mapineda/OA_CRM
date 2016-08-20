var app = angular.module('deltaCRM', ['ui.router', 'ui.bootstrap', 'xeditable', 'tableSort']);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});