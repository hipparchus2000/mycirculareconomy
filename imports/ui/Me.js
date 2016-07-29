import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './Me.html';
 
 Template.me.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.me.events({
  'click .toggle-checked'() {
    Meteor.call('meData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('meData.remove', this._id);
  },
});