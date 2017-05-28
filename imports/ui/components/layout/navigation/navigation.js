import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './navigation.html';

class Navigation {
  constructor($scope, $reactive, $state) {
    'ngInject';
    $reactive(this).attach($scope);

  }
}

const name = 'navigation';

// create a module
export default angular.module(name, [
    angularMeteor
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: Navigation
  });
