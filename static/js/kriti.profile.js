'use strict';

// Contains all profile page related functions

angular.module('kriti.profile', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('profile', {
          url: '/:id/',
          templateUrl: '/static/angular_views/kriti/profile.html',
          controller: 'ProfileCtrl'
        });
    }
  ]);

angular.module('kriti.profile')
  .controller('ProfileCtrl', ['$scope', 'ItemService',
    function ($scope, ItemService) {
      $scope.items = ItemService.getAllItems().then(function (items) {
        return items;
      });
    }
  ]);
