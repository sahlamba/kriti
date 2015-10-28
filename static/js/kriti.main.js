'use strict';

// Contains the main controller functions

angular.module('kriti.main', [])
  .config(['$urlRouterProvider',
    function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }
  ]);

angular.module('kriti.main')
  .controller('MainCtrl', ['$rootScope', '$scope', '$state', 'ItemService', 'SearchService', 'ngDialog', 'Lightbox',
    function ($rootScope, $scope, $state, ItemService, SearchService, ngDialog, Lightbox) {
      $rootScope.appTitle = 'Kriti'; // Bakchodi

      $rootScope.items = []; // Global array of 'all' items

      // The 'current_user' object contains info about the logged in user
      $rootScope.current_user = {
        name: 'Mila Kunis',
        photo: 'http://media.onsugar.com/files/2011/01/05/1/192/1922153/ea8f1ca1b21ed7a8_mila.jpg',
        enrolment: '13117060',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo lectus nunc, non dignissim tellus blandit in. Donec ipsum lacus viverra fusce.'
      };

      // Open item in a lightbox
      $rootScope.openItem = function (item) {
        Lightbox.openModal([item], 0);
      };

      // Put in rootScope to use in lightbox also, appreciates item
      $rootScope.appreciateItem = function (id) {
        ItemService.appreciateItem(id);
      };

      // Search object contains query, results, request function
      $scope.search = {
        query: null,
        results: [], // Array or object, depends on Backend API
        in: 'all',
        options: ['all', 'article', 'poem', 'user'],
        search: function () {
          if (this.query === null || this.query === undefined || this.query === '') {
            console.log('No search for you.');
            return;
          } else {
            console.log('Searching...');
            SearchService.search(this.query).then(function (results) {
              $scope.search.results = results;
              ngDialog.open({
                template: '/static/angular_views/kriti/parts/search.html',
                className: 'ngdialog-theme-default',
                overlay: false,
                scope: $scope,
                data: results
              });
            });
          }
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
            template: '/static/angular_views/kriti/parts/add.html',
            className: 'ngdialog-theme-default',
            overlay: true,
            scope: $scope
          });
        },
        openForm: function (theOne) {
          // Open requested form dialog
          this.item.category = theOne;
          var temp = '/static/angular_views/kriti/parts/' + theOne + '.html';
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
        addItem: function () {
          this.uploading = true;
          if(this.validateInputs()) {
            console.log(this.item);
            // Make request here
            this.uploading = false; // Set to false after request completion
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
