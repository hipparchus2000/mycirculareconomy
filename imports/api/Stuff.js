import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const StuffData = new Mongo.Collection('Stuff');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('stuffData', function stuffDataPublication() {
    return StuffData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'stuffData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    StuffData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'stuffData.remove'(taskId) {
    check(taskId, String);

    const task = StuffData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    StuffData.remove(taskId);
  },
  'stuffData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = StuffData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    StuffData.update(taskId, { $set: { checked: setChecked } });
  },
});
