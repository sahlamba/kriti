'use strict';

angular.module('kriti', [
    'ngDialog',
    'ngAnimate',
    'ui.router',
    'angular-loading-bar',
    'textAngular',
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
