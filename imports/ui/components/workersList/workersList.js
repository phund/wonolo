import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import uiTree from 'angular-ui-tree';

import { Meteor } from 'meteor/meteor';
import { PAGE_SIZES } from '/imports/api/constants';

import template from './workersList.html';


class WorkersList {
  constructor($scope, $reactive, $state, $http, SweetAlert) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$scope = $scope;
    this.$http = $http;

    this.$awaitUser().then((user) => {}, (err) => {
      $state.go('auth.login');
    });

    // Paging: Variables
    this.pageSizes = PAGE_SIZES;
    this.itemsPerPage = PAGE_SIZES[0];
    this.currentPage = 1;
    this.itemsCount = 0;
    this.workers = [];
    this.type = 'Worker';

    this.sweetAlert = SweetAlert;
    this.autorun(() => {
      this.options = {
        type: this.getReactively('type'),
        page: this.getReactively('currentPage'),
        per: this.getReactively('itemsPerPage'),
      };
    });

    this.getData();
  }

  getData() {
    Meteor.call('getUsersList', this.options, (error, result) => {
      console.log(error);
      console.log(result);
      if (!error) {
        this.workers = result.users;
        this.$scope.$apply();
      }
    });
  }

}

const name = 'workersList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    uiTree,
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
