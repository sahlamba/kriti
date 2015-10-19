'use strict';

angular.module('kriti', [
    'ngDialog',
    'ngAnimate',
    'ui.router',
    'angular-loading-bar',
    'textAngular',
    'angularMoment',
    'bootstrapLightbox',
    'sun.scrollable',
    'kriti.services',
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
  ])
  .config(['LightboxProvider',
    function (LightboxProvider) {
      LightboxProvider.templateUrl = '/static/views/parts/item.html';
      LightboxProvider.getImageUrl = function (item) {
        return item.image;
      };
      LightboxProvider.getImageCaption = function (item) {
        return item.itemName;
      };
  }]);
