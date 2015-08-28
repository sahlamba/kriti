'use strict';

// Contains all profile page related functions

angular.module('kriti.profile', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('profile', {
          url: '/:id/',
          templateUrl: 'static/views/profile.html',
          controller: 'ProfileCtrl',
          resolve: {
            items: function (ItemService) {
              return ItemService.getAllItems();
            }
          }
        });
    }
  ]);

angular.module('kriti.profile')
  .controller('ProfileCtrl', ['$scope', 'items',
    function ($scope, items) {
      $scope.items = items;
    }
  ]);