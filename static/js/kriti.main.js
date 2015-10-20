'use strict';

// Contains the main controller functions

angular.module('kriti.main', [])
  .config(['$urlRouterProvider',
    function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }
  ]);

angular.module('kriti.main')
  .controller('MainCtrl', ['$rootScope', '$scope', '$state', 'SearchService', 'ngDialog',
    function ($rootScope, $scope, $state, SearchService, ngDialog) {
      $rootScope.appTitle = 'Kriti'; // Bakchodi

      // The 'current_user' object contains info about the logged in user
      $rootScope.current_user = {
        name: 'Mila Kunis',
        photo: 'http://media.onsugar.com/files/2011/01/05/1/192/1922153/ea8f1ca1b21ed7a8_mila.jpg',
        enrolment: '13117060'
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
                template: '/static/views/parts/search.html',
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
          appreciations: 0,
          appreciated: false,
          category: null,
          files: [], // Array of uploaded file links
        },
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
          if (true) { // Check input field validations
            return true;
          } else {
            return false;
          }
        },
        addItem: function () {
          if(this.validateInputs()) {
            // Continue
          } else {
            // Throw up error
          }
        }
      };

    }
  ]);
