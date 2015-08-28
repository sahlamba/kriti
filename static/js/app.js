'use strict';

angular.module('kriti', [
    'ngSanitize',
    'ui.router',
    'kriti.main',
    'kriti.home',
    'kriti.profile'
  ])
  .config(['$interpolateProvider',
    function ($interpolateProvider) {
      $interpolateProvider.startSymbol('{~');
      $interpolateProvider.endSymbol('~}');
    }
  ]);
