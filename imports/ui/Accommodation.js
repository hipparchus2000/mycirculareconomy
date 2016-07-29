import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Accommodation.html';
 
 Template.accommodation.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.accommodation.events({
  'click .toggle-checked'() {
    Meteor.call('accommodationData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('accommodationData.remove', this._id);
  },
});