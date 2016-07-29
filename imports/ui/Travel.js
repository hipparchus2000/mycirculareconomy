import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Travel.html';
 
 Template.travel.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.travel.events({
  'click .toggle-checked'() {
    Meteor.call('travelData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('travelData.remove', this._id);
  },
});