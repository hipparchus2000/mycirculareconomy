import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Transport.html';
 
 Template.transport.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.transport.events({
  'click .toggle-checked'() {
    Meteor.call('transportData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('transportData.remove', this._id);
  },
});