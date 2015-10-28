'use strict';

// Contains all profile page related functions

angular.module('kriti.profile', [])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('profile', {
          url: '/:id/',
          templateUrl: '/static/views/profile.html',
          controller: 'ProfileCtrl'
        });
    }
  ]);

angular.module('kriti.profile')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$stateParams', 'ItemService', 'UserService', 'NotificationSys',
    function ($scope, $rootScope, $stateParams, ItemService, UserService, NotificationSys) {

      $scope.getInitialData = function () { // Get all data for items of user
        if ($stateParams.id === $rootScope.current_user.enrolment && $rootScope.items.length !== 0) {
          // Get items posted by user and his followers using UserService or ItemService
          $scope.followingItems = $rootScope.items; // Store following users' items in profileItems
          // rootScope Items contain all items
          $scope.profileUser = $rootScope.current_user;
        } else {
          // Get items posted by user using UserService or ItemService
          // Get user's data also
          $scope.profileUser = $rootScope.current_user;
          ItemService.getAllItems().then(function (data) {
            $rootScope.items = data; // Put in rootScope so it can be accessed in all of user's routes
            $scope.followingItems = $rootScope.items;
            NotificationSys.notify("Profile data transfer complete.", "success");
          });
        }
      };

    }
  ]);
