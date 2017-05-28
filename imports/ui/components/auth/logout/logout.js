import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Accounts } from 'meteor/accounts-base';
import template from './logout.html';

class Logout {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);
  }

  logout() {
    Accounts.logout(this.$bindToContext(() => {
      this.$state.go('auth.login');
    }));
  }
}

const name = 'logout';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: Logout
  })
