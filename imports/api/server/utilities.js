import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import moment from 'moment';
import Future from 'fibers/future';

import { Settings } from '/imports/api/settings';


export function getToken() {
  let future = new Future(),
    setting = Settings.findOne({code: "api-token"});
  if (setting && setting.token && moment().isBefore(setting.expiresAt)) {
    return setting.token;
  }

  HTTP.post(`${Meteor.settings.API_HOST}/authenticate`, {
    headers: {
     'Content-Type': 'application/json'
    },
    data: {
      api_key: Meteor.settings.API_KEY,
      secret_key: Meteor.settings.SECRET_KEY,
    }
  }, (error, result) => {
    let token = '';
    if (!error) {
      token = result.data.token;
      Settings.update({
        code: "api-token"
      }, {
        $set: {
          token: token,
          expiresAt: moment(result.data.expires_at).toDate()
        }
      }, {
        upsert: true
      })
    }
    future.return(token);
  });

  return future.wait();
}

