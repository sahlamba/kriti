'use strict';

angular.module('kriti', [
    'ngDialog',
    'ngAnimate',
    'ui.router',
    'angular-loading-bar',
    'textAngular',
    'angularMoment',
    'kriti.main',
    'kriti.home',
    'kriti.profile'
  ])
  .config(['$interpolateProvider', 'cfpLoadingBarProvider',
    function ($interpolateProvider, cfpLoadingBarProvider) {
      $interpolateProvider.startSymbol('{~');
      $interpolateProvider.endSymbol('~}');
      cfpLoadingBarProvider.includeSpinner = false;
    }
  ]);
