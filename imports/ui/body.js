import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { TransportData } from '../api/Transport.js';
import './Transport.js';   
import { AccommodationData } from '../api/Accommodation.js';
import './Accommodation.js';
import { DigitalLifeData } from '../api/DigitalLife.js';
import './DigitalLife.js';
import { HobbiesData } from '../api/Hobbies.js';
import './Hobbies.js';
import { StuffData } from '../api/Stuff.js';
import './Stuff.js';
import { MeData } from '../api/Me.js';
import './Me.js';
import { FoodData } from '../api/Food.js';
import './Food.js';
import { TravelData } from '../api/Travel.js';
import './Travel.js'; 

import './body.html';
 
Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('transportData'); 
  Meteor.subscribe('accommodationData');
  Meteor.subscribe('digitalLifeData');
  Meteor.subscribe('hobbiesData');
  Meteor.subscribe('stuffData');
  Meteor.subscribe('meData');
  Meteor.subscribe('foodData');
  Meteor.subscribe('travelData'); 
  
  this.state = new ReactiveDict();
});

Template.body.helpers({
  transportData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return TransportData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return TransportData.find({}, { sort: { createdAt: -1 } });
  },
  
 
  accommodationData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return AccommodationData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return AccommodationData.find({}, { sort: { createdAt: -1 } });
  },

  digitalLifeData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return DigitalLifeData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return DigitalLifeData.find({}, { sort: { createdAt: -1 } });
  },

  hobbiesData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return HobbiesData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return HobbiesData.find({}, { sort: { createdAt: -1 } });
  },

  stuffData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return StuffData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return StuffData.find({}, { sort: { createdAt: -1 } });
  },

  meData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return MeData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return MeData.find({}, { sort: { createdAt: -1 } });
  },

    foodData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return FoodData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return FoodData.find({}, { sort: { createdAt: -1 } });
  },

  travelData() {
    const instance = Template.instance();
    if (instance.state.get('hideArchived')) {
      // If hide completed is checked, filter tasks
      return TravelData.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
  	return TravelData.find({}, { sort: { createdAt: -1 } });
  },


});


Template.body.events({
  'submit .new-Transport'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('transportData.insert', text);
	// Clear form
    target.text.value = '';
  },

  
  'submit .new-Accommodation'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('accommodationData.insert', text);
	// Clear form
    target.text.value = '';
  },

  'submit .new-DigitalLife'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('digitalLifeData.insert', text);
	// Clear form
    target.text.value = '';
  },

  'submit .new-Hobbies'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('hobbiesData.insert', text);
	// Clear form
    target.text.value = '';
  },

  'submit .new-Stuff'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('stuffData.insert', text);
	// Clear form
    target.text.value = '';
  },

  'submit .new-Me'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('meData.insert', text);
	// Clear form
    target.text.value = '';
  },

  'submit .new-Food'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('foodData.insert', text);
	// Clear form
    target.text.value = '';
  },

    'submit .new-Travel'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    Meteor.call('travelData.insert', text);
	// Clear form
    target.text.value = '';
  },

  
  'change .hide-archived input'(event, instance) {
    instance.state.set('hideArchived', event.target.checked);
  },


});

