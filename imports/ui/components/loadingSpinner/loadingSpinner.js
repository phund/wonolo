import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './loadingSpinner.html';

class Spinner {
  constructor($rootScope, $scope, loadingSpinner) {
    'ngInject';

    $rootScope.$watch('showSpinner', (showSpinner) => {
      this.isShow = showSpinner;
    });
  }
}

const name = 'spinner';
// create a module
export default angular.module(name, [
    angularMeteor
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: Spinner
  })
  .factory('loadingSpinner', ['$rootScope', function($rootScope) {
    return {
      show: function(needApply=false) {
        $rootScope.showSpinner = true;
        if (needApply) {
          $rootScope.$apply();
        }
      },
      hide: function(needApply=false) {
        $rootScope.showSpinner = false;
        if (needApply) {
          $rootScope.$apply();
        }
      },
      toogle: function(needApply=false) {
        $rootScope.showSpinner = !$rootScope.showSpinner;
        if (needApply) {
          $rootScope.$apply();
        }
      }
    }
  }]);