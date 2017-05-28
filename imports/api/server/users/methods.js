import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import moment from 'moment';
import Future from 'fibers/future';

import { getToken } from '/imports/api/server/utilities';

export function getUsersList(options) {
  console.log(options);
  if (!options.type || !options.page || !options.per) return [];
  let future = new Future();

  let token = getToken();
  if (!token) {
    return [];
  }

  let data =  {
    token: token,
    type: options.type,
    page: options.page,
    per: options.per
  }

  if (options.search) {
    data.email = options.search;
  }

  HTTP.get(`${Meteor.settings.API_HOST}/users`, {
    headers: {
     'Content-Type': 'application/json'
    },
    data: data
  }, (error, result) => {
    console.log(result);
    future.return(result.data);
  });

  return future.wait();
}

Meteor.methods({
  getUsersList
});
