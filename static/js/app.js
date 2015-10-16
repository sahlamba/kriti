'use strict';

angular.module('kriti', [
    'ngDialog',
    'ngAnimate',
    'ui.router',
    'angular-loading-bar',
    'textAngular',
    'angularMoment',
    'bootstrapLightbox',
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
      // increase the maximum display height of the image
      LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
        return {
          'maxWidth': dimensions.windowWidth >= 768 ? // default
            dimensions.windowWidth - 92 :
            dimensions.windowWidth - 52,
          'maxHeight': 1600                           // custom
        };
      };
      // the modal height calculation has to be changed since our custom template is
      // taller than the default template
      LightboxProvider.calculateModalDimensions = function (dimensions) {
        var width = Math.max(400, dimensions.imageDisplayWidth + 32);
        if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
          width = 'auto';
        }
        return {
          'width': width,                             // default
          'height': 'auto'                            // custom
        };
      };
  }]);
