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
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$stateParams', 'ItemService', 'UserService', 'ngDialog', 'NotificationSys',
    function ($scope, $rootScope, $stateParams, ItemService, UserService, ngDialog, NotificationSys) {

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

      // Update Profile
      $scope.updateProfile = function () {
        $scope.edit_profile = {
          updating: false,
          aboutMe: $rootScope.current_user.profile.aboutMe,
          facebook: $rootScope.current_user.profile.facebook[0],
          twitter: $rootScope.current_user.profile.twitter[0],
          quora: $rootScope.current_user.profile.quora[0],
          blog: $rootScope.current_user.profile.blog[0],
          px500: $rootScope.current_user.profile.px500,
          behance: $rootScope.current_user.profile.behance,
          dribbble: $rootScope.current_user.profile.dribbble
        };
        ngDialog.open({
          template: '/static/views/parts/update.html',
          className: 'ngdialog-theme-default',
          overlay: true,
          scope: $scope
        });
      };
      $scope.updateProfileCall = function (data) {
        // body...
      };

    }
  ]);
