'use strict';

// Contains the services, directives, filters, main controller

angular.module('kriti.main', [])
  .config(['$urlRouterProvider',
    function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }
  ]);

angular.module('kriti.main')
  .factory('ItemService', ['$q', '$http',
    function ($q, $http) {
      return {
        getAllItems: function () {
          var defer = $q.defer();

          // Make http request here
          setTimeout(function () {
            defer.resolve({
              'name': 'test'
            });
          }, 1000);

          return defer.promise;
        }
      };
    }
  ]);

angular.module('kriti.main')
  .controller('MainCtrl', ['$rootScope', '$scope', '$state',
    function ($rootScope, $scope, $state) {
      $rootScope.appTitle = 'Kriti';

      // The 'user' object contains info about the logged in user
      $rootScope.user = {
        'name': 'Mila Kunis',
        'photo': 'http://media.onsugar.com/files/2011/01/05/1/192/1922153/ea8f1ca1b21ed7a8_mila.jpg',
        'enrolment': '13117060'
      };

      $scope.search = {
        'query': null,
        'in': 'all',
        'options': ['all', 'article', 'poem', 'user']
      }
    }
  ]);
