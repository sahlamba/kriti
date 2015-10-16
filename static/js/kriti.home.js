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
  .controller('HomeCtrl', ['$scope', 'ItemService', 'ngDialog', 'Lightbox',
    function ($scope, ItemService, ngDialog, Lightbox) {
      ItemService.getAllItems().then(function (data) {
        $scope.items = data;
      });

      $scope.openItem = function (item) {
        // var options = {
        //   template: '/static/views/parts/item.html',
        //   className: 'ngdialog-theme-default',
        //   scope: $scope,
        //   data: item
        // };
        // ngDialog.open(options);
        Lightbox.openModal([item], 0);
      };

      $scope.likeItem = function (id) {
        ItemService.likeItem(id);
      };

    }
  ]);
