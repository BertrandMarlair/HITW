import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Maps = new Mongo.Collection('maps');

if (Meteor.isServer) {
    Meteor.publish('allMaps', tasksPublication = () => {
        return Maps.find({});
    });

    Meteor.methods({
        // 'maps.insert'(title) {
        //     check(title, String);
        //     Maps.insert({
        //         title
        //     });
        // },
        // 'maps.remove'(selectId) {
        //     check(selectId, String);
        //     Form.remove(selectId);
        // },
        // 'maps.setChecked'(taskId, setChecked) {
        //     check(taskId, String);
        //     check(setChecked, Boolean);
        //     Form.update(taskId, { $set: { checked: setChecked } });
        // },
    });
}