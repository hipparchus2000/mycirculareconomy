import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const MeData = new Mongo.Collection('Me');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('meData', function meDataPublication() {
    return MeData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'meData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    MeData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'meData.remove'(taskId) {
    check(taskId, String);

    const task = MeData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    MeData.remove(taskId);
  },
  'meData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = MeData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    MeData.update(taskId, { $set: { checked: setChecked } });
  },
});
