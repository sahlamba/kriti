'use strict';

app.controller('MainCtrl', ['$rootScope', '$scope',
  function ($rootScope, $scope) {
    $rootScope.appTitle = 'Kriti';
  }
]);

app.controller('HomeCtrl', ['$scope', 'items',
  function ($scope, items) {
    $scope.items = items;
  }
]);
