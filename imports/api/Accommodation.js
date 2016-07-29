import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const AccommodationData = new Mongo.Collection('Accommodation');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('accommodationData', function accommodationDataPublication() {
    return AccommodationData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'accommodationData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    AccommodationData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'accommodationData.remove'(taskId) {
    check(taskId, String);

    const task = AccommodationData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    AccommodationData.remove(taskId);
  },
  'accommodationData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = AccommodationData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    AccommodationData.update(taskId, { $set: { checked: setChecked } });
  },
});
