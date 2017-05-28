import { Meteor } from 'meteor/meteor';
import { _ } from 'underscore';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngSanitize from 'angular-sanitize';

import { name as Layout } from '../layout/layout';
import { name as Auth } from '../auth/auth';
import { name as Home } from '../home/home';
import { name as TopSearch } from '../topSearch/topSearch';
import { name as WorkersList } from '../workersList/workersList';
import { name as EmployersList } from '../employersList/employersList';

import { pageTitle, sideNavigation, iboxTools, iboxToolsFullScreen, minimalizaSidebar, icheck, scrollThis, starRating } from '../../directives/directives';

import 'angular-sweetalert';
import 'ui-select';

import template from './wonolo.html';

class Wonolo {
  constructor($scope, $reactive, $rootScope) {
    'ngInject';
    $reactive(this).attach($scope);
  }

}

const name = 'wonolo';

// create a module
export default angular.module(name, [
    angularMeteor,
    angularMeteorAuth,
    uiRouter,
    uiBootstrap,
    ngSanitize,
    Layout,
    Auth,
    Home,
    'oitozero.ngSweetAlert',
    'ui.select',
    TopSearch,
    WorkersList,
    EmployersList
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: Wonolo
  })
  .directive('pageTitle', pageTitle)
  .directive('sideNavigation', sideNavigation)
  .directive('iboxTools', iboxTools)
  .directive('iboxToolsFullScreen', iboxToolsFullScreen)
  .directive('minimalizaSidebar', minimalizaSidebar)
  .directive('icheck', icheck)
  .directive('scrollThis', scrollThis)
  .directive('starRating', starRating)
  .config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/auth/login');
}

function run($rootScope, $state, $auth, $timeout) {
  'ngInject';

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('auth.login');
    }
    if (error === 'FORBIDDEN') {
      $state.go('home', null, { reload: true });
    }
  });
}
