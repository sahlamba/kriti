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
      $rootScope.appTitle = 'Kriti';

      // The 'current_user' object contains info about the logged in user
      $rootScope.current_user = {
        name: 'Mila Kunis',
        photo: 'http://media.onsugar.com/files/2011/01/05/1/192/1922153/ea8f1ca1b21ed7a8_mila.jpg',
        enrolment: '13117060'
      };

      $scope.search = {
        query: null,
        in: 'all',
        options: ['all', 'article', 'poem', 'user'],
        search: function () {
          if (this.query === null || this.query === undefined || this.query === '') {
            console.log('No search for you.');
            return;
          } else {
            console.log('Searching...');
            SearchService.search(this.query).then(function (results) {
              var options = {
                template: '/static/views/parts/search.html',
                className: 'ngdialog-theme-default',
                overlay: false,
                scope: $scope,
                data: results
              };
              ngDialog.open(options);
            });
          }
        }
      };
    }
  ]);
