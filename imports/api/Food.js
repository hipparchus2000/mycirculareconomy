import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const FoodData = new Mongo.Collection('Food');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('foodData', function foodDataPublication() {
    return FoodData.find(
        { owner: this.userId }
    );
  });
}
 

Meteor.methods({
  'foodData.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    FoodData.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'foodData.remove'(taskId) {
    check(taskId, String);

    const task = FoodData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    FoodData.remove(taskId);
  },
  'foodData.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    const task = FoodData.findOne(taskId);
    if (task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    FoodData.update(taskId, { $set: { checked: setChecked } });
  },
});
