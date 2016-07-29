import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Stuff.html';
 
 Template.stuff.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.stuff.events({
  'click .toggle-checked'() {
    Meteor.call('stuffData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('stuffData.remove', this._id);
  },
});