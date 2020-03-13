const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');

admin.initializeApp();
exports.addAdminRole = functions.https.onCall(function(data, context) {

    //check request is made by an admin
    if (context.auth.token.admin !== true) {
        return { error: 'only admins can add other admins.' };
    }

    //get user and add custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(function(user) {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(function() {
        return {
            message: `Sucess! ${data.email} has been made an admin.`
        };
    }).catch(function(error) {
        return error;
    });
});