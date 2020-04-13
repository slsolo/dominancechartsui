const { google } = require("googleapis");
const credentials = require("./credentials");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

let jwtClient = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  SCOPES
);
//authenticate request
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully connected!");
  }
});
// names for list of ranges extracted from the spreadsheet
const spreadsheetId = "10-9WtItK0LWyUSZqnI_6sGngJXtgVsSaSYJd2GN3qqw";
const dominanceDataKeys = [
  ["furs"],
  ["eyes"],
  ["shades", "tails", "ears", "whiskers", "whiskerShapes"],
  ["confettiFurs"],
  ["genesisFurs"],
  ["genesisEyes"],
];
let dominanceData = {
  furs: {
    placed: {},
    unplaced: {},
  },
  genesisFurs: {
    placed: {},
    unplaced: {},
  },
  eyes: {
    placed: {},
    unplaced: {},
  },
  genesisEyes: {
    placed: {},
    unplaced: {},
  },
  confettiFurs: {
    placed: {},
    unplaced: {},
  },
  shades: {
    placed: {},
    unplaced: {},
  },
  tails: {
    placed: {},
    unplaced: {},
  },
  ears: {
    placed: {},
    unplaced: {},
  },
  whiskers: {
    placed: {},
    unplaced: {},
  },
  whiskerShapes: {
    placed: {},
    unplaced: {},
  },
};
const FIRST_COLUMN = 0;
let sheets = google.sheets("v4");
sheets.spreadsheets.get(
  {
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    includeGridData: true,
    ranges: [
      "Fur!A2:A",
      "Eyes!A2:A",
      "Other!D3:D",
      "Other!F3:F",
      "Other!H3:H",
      "Other!J3:J",
      "Other!L3:L",
      "Confetti furs!A3:A",
      "Genesis Furs!A12:A",
      "Genesis Eyes!A14:A",
    ],
  },
  function (err, response) {
    if (err) {
      console.error(err);
    } else {
      let sheetData = response.data.sheets;

      for (sheet in sheetData) {
        for (column in sheetData[sheet].data) {
          for (row in sheetData[sheet].data[column].rowData) {
            if (
              !sheetData[sheet].data[column].rowData[row].hasOwnProperty(
                "values"
              ) ||
              sheetData[sheet].data[column].rowData[row].values[FIRST_COLUMN]
                .effectiveValue === undefined
            ) {
              break;
            }
            dominanceData[dominanceDataKeys[sheet][column]].placed[
              sheetData[sheet].data[column].rowData[row].values[
                FIRST_COLUMN
              ].effectiveValue.stringValue
            ] = row;
          }
        }
      }
      console.log(JSON.stringify(dominanceData));
    }
  }
);
