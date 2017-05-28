import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { _ } from 'underscore';

export default angular.module('TopSearch', [
    angularMeteor
  ])
  .factory('TopSearchService', ['$rootScope', '$q', function($rootScope, $q) {

    let o = {
      loading: false,
      searchKey: ''
    }

    o.init = function() {
      setTimeout(function() {
        $('input#top-search').val('');
        o.searchKey = '';
      }, 0);

      $('input#top-search').on('keyup', function(e) {
        let searchVal = $('input#top-search').val();
        if (!_.isEmpty(searchVal)) {
          $("#clear-top-search").show();
        } else {
          $("#clear-top-search").hide();
        }
        if (!o.loading && (e.keyCode == 13 || e.which == 13)) {
          if ($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest') {
            $rootScope.$apply(function() {
              o.searchKey = searchVal;
            });
          } else {
            o.searchKey = searchVal;
          }
        }
      });
      $('input#top-search').on('keydown', function(e) {
        if (o.loading) {
          return false;
        }
      });
    }

    o.getSearchKey = function() {
      return o.searchKey;
    }

    return o;

  }])
