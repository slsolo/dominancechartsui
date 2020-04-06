const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const credentials = require("./credentials");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

let jwtClient = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);
//authenticate request
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully connected!");
  }
});

let spreadsheetId = "10-9WtItK0LWyUSZqnI_6sGngJXtgVsSaSYJd2GN3qqw";
let dominanceData = {
  furs: {},
  eyes: {},
  confettiFurs: {},
  eyeShape: {},
  pupil: {},
  shades: {},
  tails: {},
  ears: {},
  whiskers: {},
  whiskerShapes: {},
};
let sheets = google.sheets("v4");
sheets.spreadsheets.get(
  {
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    includeGridData: true,
    ranges: [],
  },
  function (err, response) {
    if (err) {
      console.error(err);
    } else {
      // let placedFurList = [];
      // for (let row of response.data.values) {
      //   if (row[0] !== undefined) {
      //     placedFurList.push(row[0]);
      //   } else {
      //     break;
      //   }
      // }
      // console.log(placedFurList.length);
      // for (fur in placedFurList) {
      //   console.log(placedFurList[fur]);
      // }

      // let unplacedFirList = [];
      // let unplaced = false;
      // for (let row of response.data.values) {
      //   if (row[0] === "Unplaced Traits") {
      //     unplaced = true;
      //     continue;
      //   }
      //   if (row[0] === "New Furs") {
      //     unplaced = false;
      //   }
      //   if (unplaced && row[0] !== undefined) {
      //     unplacedFirList.push(row[0]);
      //   }
      // }

      // console.log(``);
      // console.log(`Unplaced`);
      // for (fur in unplacedFirList) {
      //   console.log(unplacedFirList[fur]);
      // }
      for (sheet in response.data.sheets) {
        if (
          response.data.sheets[sheet].properties.title === "About us" ||
          response.data.sheets[sheet].properties.title === "User manual"
        ) {
          continue;
        }
        console.log(response.data.sheets[sheet].properties.title);
      }
    }
  }
);
