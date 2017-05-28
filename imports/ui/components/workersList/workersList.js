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

    this.$scope = $scope;
    this.$http = $http;
    this.isLoading = false;

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

    this.sweetAlert = TopSearchService;

    this.autorun(() => {
      this.options = {
        type: this.getReactively('type'),
        search: this.getReactively('searchText'),
        page: this.getReactively('currentPage'),
        per: this.getReactively('itemsPerPage'),
      };
      this.getData();
    });

    TopSearchService.init();

    this.searchText = '';

    this.$scope.$watch(() => {
      return TopSearchService.getSearchKey();
    }, (newVal, oldVal) => {
      this.searchText = newVal;
    }, true);

  }

  getData() {
    if (!this.type || !this.currentPage || !this.itemsPerPage) return;
    this.isLoading = true;
    Meteor.call('getUsersList', this.options, (error, result) => {
      if (!error) {
        this.workers = result.users;
      }
      this.isLoading = false;
      this.$scope.$apply();
    });
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
