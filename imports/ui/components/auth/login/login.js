import { Meteor } from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';


import template from './login.html';

class Login {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);

    this.$awaitUser().then((user) => {
      $state.go('home', null, { reload: true });
    }, (err) => {});

    this.$state = $state;


    this.credentials = {
      email: 'tester@tester.com',
      password: '12345678'
    };

    this.error = '';
  }

  login() {
    Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
      this.$bindToContext((err) => {
        if (err) {
          this.error = err;
        } else {
          this.$state.go('home');
        }
      })
    );
  }
}

const name = 'login';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: Login
  })
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('auth.login', {
    url: '/login',
    template: '<login></login>'
  });
}
