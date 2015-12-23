/* API URLs */

'use strict';

var api = {
  home: 'http://beta.json-generator.com/api/json/get/NytczYQ8g',
  all_items: 'http://beta.json-generator.com/api/json/get/NytczYQ8g', // Alias
  current_user: 'http://beta.json-generator.com/api/json/get/V1U87YXIx',
  user_profile: function (enrollment) {
    return 'http://beta.json-generator.com/api/json/get/V1e4AYQUl';
  },
  search: function (query) {
    return 'http://beta.json-generator.com/api/json/get/4yfO_YQUe';
  },
  follow_unfollow: function (user, action) {
    return '';
  },
  appreciate: '',
  upload: ''
};
