
import '../../api/api.js';
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    Meteor.startup(() => {
        console.log("Starting server...");
    });
}

