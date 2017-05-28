import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  if (Meteor.users.find({ }).count() == 0) {
    const tester = {
      email: "tester@tester.com",
      password: '12345678',
      profile: { firstName: 'Tester', middleName: '', lastName: '' }
    };
    Accounts.createUser(tester);
  }
});
