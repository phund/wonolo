import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './home.html';

class HomePage {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);

    this.$awaitUser().then((user) => {
    }, (err) => {
      $state.go('auth.login');
    });
  }

}

const name = 'homePage';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: HomePage
  })
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/home',
      template: '<home-page></home-page>'
    });
}