'use strict';

// Contains filters

angular.module('kriti.filters', []);

angular.module('kriti.filters')
  .filter('fixUndefined', function () {
    return function (item) {
      if (item === undefined)
        return 0
      else
        return item
    };
  });
