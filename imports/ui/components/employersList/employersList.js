import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { PAGE_SIZES } from '/imports/api/constants';
import { name as UsersList } from '../usersList/usersList';

import 'angular-paging';

import template from './employersList.html';

class EmployersList {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);

    this.$awaitUser().then((user) => {}, (err) => {
      $state.go('auth.login');
    });

    this.typeList = "Employer";
  }
}

const name = 'employersList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    UsersList
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: EmployersList
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('employers', {
      url: '/employers',
      template: '<employers-list></employers-list>'
    });
}
