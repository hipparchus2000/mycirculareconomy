import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const TravelData = new Mongo.Collection('Travel');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('travelData', function travelDataPublication() {
    return TravelData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'travelData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    TravelData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'travelData.remove'(taskId) {
    check(taskId, String);

    const task = TravelData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    TravelData.remove(taskId);
  },
  'travelData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = TravelData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    TravelData.update(taskId, { $set: { checked: setChecked } });
  },
});
