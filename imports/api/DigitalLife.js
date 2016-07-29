import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const DigitalLifeData = new Mongo.Collection('DigitalLife');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('digitalLifeData', function digitalLifeDataPublication() {
    return DigitalLifeData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'digitalLifeData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    DigitalLifeData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'digitalLifeData.remove'(taskId) {
    check(taskId, String);

    const task = DigitalLifeData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    DigitalLifeData.remove(taskId);
  },
  'digitalLifeData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = DigitalLifeData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    DigitalLifeData.update(taskId, { $set: { checked: setChecked } });
  },
});
