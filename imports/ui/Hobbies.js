import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Hobbies.html';
 
 Template.hobbies.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.hobbies.events({
  'click .toggle-checked'() {
    Meteor.call('hobbiesData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('hobbiesData.remove', this._id);
  },
});