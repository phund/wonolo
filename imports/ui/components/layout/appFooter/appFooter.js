import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './appFooter.html';

const name = 'appFooter';

// create a module
export default angular.module(name, [
    angularMeteor
  ])
  .component(name, {
    template,
    controllerAs: name
  });
