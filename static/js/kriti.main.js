'use strict';

// Contains the main controller functions

angular.module('kriti.main', [])
  .config(['$urlRouterProvider',
    function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }
  ]);

angular.module('kriti.main')
  .controller('MainCtrl', ['$rootScope', '$scope', '$state', 'ItemService', 'UserService', 'SearchService', 'ngDialog', 'Lightbox',
    function ($rootScope, $scope, $state, ItemService, UserService, SearchService, ngDialog, Lightbox) {
      $rootScope.appTitle = 'Kriti'; // Bakchodi

      $rootScope.allItems = {}; // Global array of all items
      $rootScope.displayed_items = []; // Global array of items dispayed currently in app
      $rootScope.current_user = {}; // Global object of logged in user
      $scope.feed_options = [{
        name: 'All',
        isSelected: false
      }, {
        name: 'Following',
        isSelected: false
      }];
      $scope.selectOption = function (option) {
        if (!option.isSelected) {
          if (option.name === 'All') {
            $rootScope.displayed_items = $rootScope.allItems;
            $scope.feed_options[0].isSelected = true;
            $scope.feed_options[1].isSelected = false;
          } else if (option.name === 'Following') {
            $rootScope.displayed_items = $rootScope.current_user.profile.feed;
            $scope.feed_options[0].isSelected = false;
            $scope.feed_options[1].isSelected = true;
          }
        }
      };

      $scope.startApp = function () { // Initialize user/redirect, get info, posts etc.
        UserService.getCurrentUser().then(function (user) {
          if (user.status === false) { // Not logged in
            window.location = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/login/?next=/kriti/'; // Redirect
          } else {
            $rootScope.current_user = user; // The 'current_user' object contains info about the logged in user
            $rootScope.updateCurrentUserProfile();
          }
        });
      };

      $rootScope.updateCurrentUserProfile = function () {
        UserService.getUser($rootScope.current_user.enrollmentNo).then(function (data) {
          $rootScope.current_user.profile = data;
          $scope.selectOption($scope.feed_options[1]); // Following
          // Get all_items in background
          ItemService.getAllItems().then(function (data) {
            $rootScope.allItems = data;
          });
        });
      };

      // Open item in a lightbox
      $rootScope.openItem = function (item) {
        Lightbox.openModal([item], 0);
      };

      // Close lightbox and navigate to owner's profile
      $rootScope.closeAndNavigateTo = function (enrollment) {
        Lightbox.closeModal('Profile user clicked.');
        $state.go('profile', {id: enrollment});
      };

      // Navigate to page
      $rootScope.goTo = function (state, args) {
        if (args) {
          $state.go(state, args);
        } else {
          $state.go(state);
        }
      }

      // Put in rootScope to use in lightbox also, appreciates item
      $rootScope.appreciateItem = function (item) {
        ItemService.appreciateItem(item.id, !item.appreciated).then(function (resp) {
          if (resp === true) {
            item.appreciations += 1;
            item.appreciated = !item.appreciated;
          }
        });
      };

      // Search object contains query, results, request function
      $scope.search = {
        query: null,
        results: {}, // Results object, depends on Backend API
        in: 'all', // Not being used at the moment
        options: ['all', 'article', 'poem', 'user'], // Not being used at the moment
        searching: false,
        search: function () {
          if (this.query === null || this.query === undefined || this.query === '') {
            return;
          } else {
            this.searching = true;
            SearchService.search(this.query).then(function (results) {
              $scope.search.results = results;
              $scope.search.searching = false;
            });
          }
        },
        close: function () {
          this.results = {};
          this.query = null;
          this.searching = false;
        }
      };

      // newItem contains empty item object and upload item related functions
      $scope.newItem = {
        item: {
          title: null,
          owner: $rootScope.current_user,
          description: null, // Max 160 characters
          maxDescCount: 160,
          appreciations: 0,
          appreciated: false,
          category: null,
          files: [], // Array of uploaded file links
        },
        uploading: false, // Flag to check if uploading in progress
        openDialog: function () {
          // Opens dialog
          ngDialog.open({
            template: '/static/views/parts/add.html',
            className: 'ngdialog-theme-default',
            overlay: true,
            scope: $scope
          });
        },
        openForm: function (theOne) {
          // Open requested form dialog
          this.item.category = theOne;
          var temp = '/static/views/parts/' + theOne + '.html';
          ngDialog.close('ngDialog1');
          ngDialog.open({
            template: temp,
            className: 'ngdialog-theme-default',
            overlay: true,
            scope: $scope
          });
        },
        validateInputs: function () {
          if (this.item.title !== undefined) {
            if (this.item.title.trim() !== '') { // Check input field validations
              return true;
            }
          } else {
            return false;
          }
        },
        addItem: function (file) {
          this.uploading = true;
          if(this.validateInputs()) {
            console.log(this.item);
            console.log(file);
            ItemService.addItem(this.item, file)
            this.uploading = false; // Set to false after request completion
            ngDialog.close('ngDialog2');
            this.resetItemObject();
          } else {
            console.log('Please fill out all the necessary fields.');
            this.uploading = false; // Set to false after request completion
          }
        },
        resetItemObject: function () {
          this.item = {
            title: null,
            owner: $rootScope.current_user,
            description: null, // Max 160 characters
            maxDescCount: 160,
            appreciations: 0,
            appreciated: false,
            category: null,
            files: [], // Array of uploaded file links
          }
        }
      };

    }
  ]);
