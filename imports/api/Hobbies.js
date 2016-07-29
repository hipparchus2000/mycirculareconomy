import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const HobbiesData = new Mongo.Collection('Hobbies');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('hobbiesData', function hobbiesDataPublication() {
    return HobbiesData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'hobbiesData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    HobbiesData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'hobbiesData.remove'(taskId) {
    check(taskId, String);

    const task = HobbiesData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    HobbiesData.remove(taskId);
  },
  'hobbiesData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = HobbiesData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    HobbiesData.update(taskId, { $set: { checked: setChecked } });
  },
});
