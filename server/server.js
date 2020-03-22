const fs = require('fs');
const readline = require('readline');
const {
    google
} = require('googleapis');
const credentials = require('./credentials');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

let jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully connected!");

    }
});

let spreadsheetId = '10-9WtItK0LWyUSZqnI_6sGngJXtgVsSaSYJd2GN3qqw';
let sheetName = 'Fur';
let sheets = google.sheets('v4');
sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: 'Fur!A2:A138'
}, function (err, response) {
    if (err) {
        console.error(err);
    } else {
        for (let row of response.data.values) {
            console.log(row[0]);
        }
    }
})