import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Feedback = new Mongo.Collection('feedback');
 
if (Meteor.isServer) {
    Meteor.publish('feedback', () => {
      return Feedback.find();
    });
    Meteor.methods({
        'feedback.insert'(name, desc, type, platform, appVersion, language, vendor, offsetWidth, offsetHeight, fileUrl, username, lastname, promotion ) {
            check(name, String);
            check(desc, String);
            check(type, String);
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Feedback.insert({
                name,
                desc,
                type,
                platform, 
                appVersion, 
                language, 
                vendor, 
                offsetWidth, 
                offsetHeight,
                fileUrl,
                username, 
                lastname, 
                promotion
            });
        },
        'feedback.remove'(id) {
            check(id, String);
            Feedback.remove(id);
        },
    });
}