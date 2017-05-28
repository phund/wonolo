import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as Logout } from '../../auth/logout/logout';

import template from './appHeader.html';

class AppHeader {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);

    this.$scope = $scope;
    this.errors = {};
  }

}

const name = 'appHeader';

// create a module
export default angular.module(name, [
    angularMeteor,
    Logout
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: AppHeader
  });
