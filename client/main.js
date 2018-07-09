import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

import { routes, onAuthChange } from "../imports/routes/routes";
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
   const isAuthenticated = !!Meteor.userId();
   onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
   if(!Session.get('showVisible'))Session.set('showVisible', false);
   ReactDOM.render(routes, document.getElementById('app'));
});