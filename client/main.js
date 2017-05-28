import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import '/imports/startup/client';

import { name as Wonolo } from '../imports/ui/components/wonolo/wonolo';

function onReady() {
  angular.bootstrap(document, [
    Wonolo
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
