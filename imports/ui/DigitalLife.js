import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './DigitalLife.html';
 
 Template.digitalLife.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.digitalLife.events({
  'click .toggle-checked'() {
    Meteor.call('digitalLifeData.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('digitalLifeData.remove', this._id);
  },
});