'use strict';

// Contains all homepage related functions

angular.module('kriti.home', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'static/views/home.html',
          controller: 'HomeCtrl',
          resolve: {
            items: function (ItemService) {
              return ItemService.getAllItems();
            }
          }
        });
    }
  ]);

angular.module('kriti.home')
  .controller('HomeCtrl', ['$scope', 'items',
    function ($scope, items) {
      $scope.items = items;
    }
  ]);
