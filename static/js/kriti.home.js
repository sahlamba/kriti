'use strict';

// Contains all homepage related functions

angular.module('kriti.home', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/static/angular_views/kriti/home.html',
          controller: 'HomeCtrl'
        });
    }
  ]);

angular.module('kriti.home')
  .controller('HomeCtrl', ['$scope', '$rootScope', 'ItemService', 'NotificationSys', 'ngDialog', 'Lightbox',
    function ($scope, $rootScope, ItemService, NotificationSys, ngDialog, Lightbox) {

      $scope.getInitialData = function () { // Get all data for items on homepage and logged in user
        ItemService.getAllItems().then(function (data) {
          $rootScope.items = data; // Put in rootScope so it can be accessed in all of user's routes
          NotificationSys.notify("Initial data transfer complete.", "success");
        });
      };

      $scope.openItem = function (item) { // Open item in a lightbox
        Lightbox.openModal([item], 0);
      };

      // Put in rootScope to use in lightbox also, appreciates item
      $rootScope.appreciateItem = function (id) {
        ItemService.appreciateItem(id);
      };

    }
  ]);
