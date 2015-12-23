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
          controller: 'ProfileCtrl'
        });
    }
  ]);

angular.module('kriti.profile')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$stateParams', 'ItemService', 'UserService', 'NotificationSys',
    function ($scope, $rootScope, $stateParams, ItemService, UserService, NotificationSys) {

      $scope.getInitialData = function () { // Get all data of current profile's user
          if ($rootScope.current_user.enrollmentNo === $stateParams.id && $rootScope.current_user.profile) {
            $scope.profileUser = $rootScope.current_user.profile;
          } else {
            UserService.getUser($stateParams.id).then(function (data) {
              $scope.profileUser = data;
              NotificationSys.notify("Profile data transfer complete.", "success");
            });
          }
      };

      // Follow/Unfollow a person
      $scope.followUser = function (user, action) {
        UserService.follow_unfollow(user, action).then(function (resp) {
          if (resp) {
            $scope.profileUser.followingPerson = !$scope.profileUser.followingPerson;
            $rootScope.updateCurrentUserProfile();
          }
        });
      };

    }
  ]);
