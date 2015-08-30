'use strict';

angular.module('kriti', [
    'ngSanitize',
    'ngDialog',
    'ngAnimate',
    'ui.router',
    'angular-loading-bar',
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
