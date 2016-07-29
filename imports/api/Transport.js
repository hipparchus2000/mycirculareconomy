import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const TransportData = new Mongo.Collection('Transport');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('transportData', function transportDataPublication() {
    return TransportData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'transportData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    TransportData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'transportData.remove'(taskId) {
    check(taskId, String);

    const task = TransportData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    TransportData.remove(taskId);
  },
  'transportData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = TransportData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    TransportData.update(taskId, { $set: { checked: setChecked } });
  },
});
