
import '../../api/api.js';
import { Meteor } from 'meteor/meteor';
import bodyParser from "body-parser"
import { WebApp } from 'meteor/webapp';

// Picker.middleware(bodyParser.urlencoded({
//     extended: true
// }))

if(Meteor.isServer){
    Meteor.startup(() => {
        console.log("Starting server...");
        // Picker.route("/hello", function (params, req, res, next) {
        //     console.log(params) // some-action?a=123& ...  query params
        //     console.log(req.body) // posted data
        //     res.end()
        // })

        WebApp.connectHandlers.use((req, res, next) => {
            // console.log(req)
            // console.log(res)
            if (req.url === '/hello') {
                console.log(req.url);
                res.end()
            } else {
                next();
            }
        });
    });
}

