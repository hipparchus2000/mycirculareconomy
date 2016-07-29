import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Food.html';
 
 Template.food.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.food.events({
  'click .toggle-checked'() {
    Meteor.call('foodData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('foodData.remove', this._id);
  },
});