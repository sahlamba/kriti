'use strict';

app.config(['$stateProvider', '$urlRouterProvider', '$interpolateProvider',
  function ($stateProvider, $urlRouterProvider, $interpolateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/static/views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          items: function(ItemService) {
            return ItemService.getAllItems();
          }
        }
      });

    $interpolateProvider.startSymbol('{~');
    $interpolateProvider.endSymbol('~}');
  }
]);
