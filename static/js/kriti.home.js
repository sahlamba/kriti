'use strict';

// Contains all homepage related functions

angular.module('kriti.home', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/static/views/home.html',
          controller: 'HomeCtrl'
        });
    }
  ]);

angular.module('kriti.home')
  .controller('HomeCtrl', ['$scope', '$rootScope', 'ItemService', 'NotificationSys', 'ngDialog', 'Lightbox',
    function ($scope, $rootScope, ItemService, NotificationSys, ngDialog, Lightbox) {

      $scope.getInitialData = function () {
        ItemService.getAllItems().then(function (data) {
          $scope.items = data;
          NotificationSys.notify("Initial data transfer complete.", "success");
        });
      };

      $scope.openItem = function (item) {
        Lightbox.openModal([item], 0);
      };

      // Put in rootScope to use in lightbox also
      $rootScope.appreciateItem = function (id) {
        ItemService.appreciateItem(id);
      };

    }
  ]);
