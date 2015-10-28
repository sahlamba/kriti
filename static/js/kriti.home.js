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
  .controller('HomeCtrl', ['$scope', '$rootScope', 'ItemService', 'NotificationSys',
    function ($scope, $rootScope, ItemService, NotificationSys) {

      $scope.getInitialData = function () { // Get all data for items on homepage and logged in user
        ItemService.getAllItems().then(function (data) {
          $rootScope.items = data; // Put in rootScope so it can be accessed in all of user's routes
          NotificationSys.notify("Initial data transfer complete.", "success");
        });
      };

    }
  ]);
