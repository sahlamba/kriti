'use strict';

app.controller('MainCtrl', ['$rootScope', '$scope', '$state',
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

app.controller('HomeCtrl', ['$scope', 'items',
  function ($scope, items) {
    $scope.items = items;
  }
]);

app.controller('ProfileCtrl', ['$scope', 'items',
  function ($scope, items) {
    $scope.items = items;
  }
]);
