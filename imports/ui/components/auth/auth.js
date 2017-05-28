import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMessages from 'angular-messages';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { name as Login } from './login/login';

const name = 'auth';

class Auth {}

// create a module
export default angular.module(name, [
    angularMeteor,
    ngMessages,
    Login
  ]).component(name, {
    template: '',
    controllerAs: name,
    controller: Auth
  })
  .config(config)
  .run(run);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('auth', {
    url: '/auth',
    abstract: true,
    template: '<div ui-view></div>',
  });
}

function run($rootScope, $state, $auth, $timeout) {
  'ngInject';

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'LOGINED') {
      console.log("LOGINED");
      $state.go('dashboard');
    }
  });
}
