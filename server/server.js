const fs = require("fs");
const readline = require("readline");
const {
  google
} = require("googleapis");
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
  furs: {
    placed: {},
    unplaced: {}
  },
  eyes: {
    placed: {},
    unplaced: {}
  },
  confettiFurs: {
    placed: {},
    unplaced: {}
  },
  eyeShape: {
    placed: {},
    unplaced: {}
  },
  pupil: {
    placed: {},
    unplaced: {}
  },
  shades: {
    placed: {},
    unplaced: {}
  },
  tails: {
    placed: {},
    unplaced: {}
  },
  ears: {
    placed: {},
    unplaced: {}
  },
  whiskers: {
    placed: {},
    unplaced: {}
  },
  whiskerShapes: {
    placed: {},
    unplaced: {}
  },
};
let sheets = google.sheets("v4");
sheets.spreadsheets.get({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    includeGridData: true,
    ranges: [],
  },
  function (err, response) {
    if (err) {
      console.error(err);
    } else {
      let sheetData = response.data.sheets;

      for (d in sheetData[1].data[0].rowData) {
        if (d == 0) {
          continue;
        }
        if (
          sheetData[1].data[0].rowData[d].values[0].effectiveValue === undefined
        ) {
          break;
        }
        dominanceData.furs.placed[
          sheetData[1].data[0].rowData[d].values[0].userEnteredValue.stringValue
        ] = d;
      }

      for (d in sheetData[2].data[0].rowData) {
        if (d == 0) {
          continue;
        }
        if (
          sheetData[2].data[0].rowData[d].values[0].effectiveValue === undefined
        ) {
          break;
        }
        dominanceData.eyes.placed[
          sheetData[2].data[0].rowData[d].values[0].effectiveValue.stringValue
        ] = d;
      }

      for (d in sheetData[4].data[0].rowData) {
        if (d < 2) {
          continue;
        }
        if (
          sheetData[4].data[0].rowData[d].values[0].effectiveValue === undefined
        ) {
          break;
        }
        dominanceData.confettiFurs.placed[
          sheetData[4].data[0].rowData[d].values[0].effectiveValue.stringValue
        ] = d;
      }
      console.log(JSON.stringify(dominanceData));
    }
  }
);