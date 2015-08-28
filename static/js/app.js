'use strict';

angular.module('kriti', [
    'ngSanitize',
    'ui.router',
    'kriti.main',
    'kriti.home',
    'kriti.profile'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$interpolateProvider',
    function ($stateProvider, $urlRouterProvider, $interpolateProvider) {

      $urlRouterProvider.otherwise('/');

      $interpolateProvider.startSymbol('{~');
      $interpolateProvider.endSymbol('~}');
    }
  ]);
