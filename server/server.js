const {
  google
} = require("googleapis");
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
let spreadsheetId = "10-9WtItK0LWyUSZqnI_6sGngJXtgVsSaSYJd2GN3qqw";
let dominanceDataKeys = [
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
let sheets = google.sheets("v4");
sheets.spreadsheets.get({
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
    //ranges: [],
  },
  function (err, response) {
    if (err) {
      console.error(err);
    } else {
      let sheetData = response.data.sheets;

      for (s in sheetData) {
        for (c in sheetData[s].data) {
          for (d in sheetData[s].data[c].rowData) {
            if (
              !sheetData[s].data[c].rowData[d].hasOwnProperty("values") ||
              sheetData[s].data[c].rowData[d].values[0].effectiveValue ===
              undefined
            ) {
              break;
            }
            dominanceData[dominanceDataKeys[s][c]].placed[
              sheetData[s].data[c].rowData[
                d
              ].values[0].effectiveValue.stringValue
            ] = d;
          }
        }
      }
      console.log(JSON.stringify(dominanceData));
    }
  }
);