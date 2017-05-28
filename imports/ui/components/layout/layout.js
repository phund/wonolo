import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { name as Navigation } from './navigation/navigation';
import { name as AppFooter } from './appFooter/appFooter';
import { name as AppHeader } from './appHeader/appHeader';

const name = 'layout';

class Layout {}

// create a module
export default angular.module(name, [
    angularMeteor,
    Navigation,
    AppHeader,
    AppFooter
  ])
  .component(name, {
    template: '',
    controllerAs: name,
    controller: Layout
  });
