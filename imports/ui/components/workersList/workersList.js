import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { PAGE_SIZES } from '/imports/api/constants';

import 'angular-paging';

import template from './workersList.html';

class WorkersList {
  constructor($scope, $reactive, $state, $http, TopSearchService) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$awaitUser().then((user) => {}, (err) => {
      $state.go('auth.login');
    });

    this.typeList = "Worker";
  }

}

const name = 'workersList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    'bw.paging',
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: WorkersList
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('workers', {
      url: '/workers',
      template: '<workers-list></workers-list>'
    });
}
