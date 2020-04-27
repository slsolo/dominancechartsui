// eslint-disable-next-line prettier/prettier
const { google } = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
let port = process.env.PORT || 3000;
const keys = JSON.parse(process.env.GOOGLE_CREDENTIALS);
console.log(JSON.stringify(keys));
let jwtClient = google.auth.fromJSON(keys);
jwtClient.scopes = SCOPES;
//authenticate request
jwtClient.authorize(function (err, _tokens) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully connected!");
  }
});
const spreadsheetId = "10-9WtItK0LWyUSZqnI_6sGngJXtgVsSaSYJd2GN3qqw";
// names for list of ranges extracted from the spreadsheet
const dominanceDataKeys = [
  "furs",
  "eyes",
  "shades",
  "tails",
  "ears",
  "whiskers",
  "whiskerShapes",
  "confettiFurs",
  "genesisFurs",
  "genesisEyes",
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

function fetchPlacedTraits() {
  sheets.spreadsheets.values.batchGet(
    {
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
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
        let sheetData = response.data.valueRanges;
        for (sheet in sheetData) {
          console.log(JSON.stringify(sheetData[sheet]));
          for (column in sheetData[sheet].values) {
            if (!sheetData[sheet].values[column].length === 0) {
              break;
            }
            let asteriskPos = sheetData[sheet].values[column][0].indexOf("*");
            let retiredPos = sheetData[sheet].values[column][0].indexOf(
              "Retired"
            );
            let stringEnd = -1;
            if (asteriskPos >= 0 && retiredPos >= 0) {
              if (asteriskPos < retiredPos) stringEnd = asteriskPos;
              else stringEnd = retiredPos;
            } else if (asteriskPos >= 0) {
              stringEnd = asteriskPos;
            } else if (retiredPos >= 0) {
              stringEnd = retiredPos;
            }
            console.log(JSON.stringify(sheetData[sheet].values[column][0]));
            dominanceData[dominanceDataKeys[sheet]].placed[
              sheetData[sheet].values[column][0].substring(0, stringEnd)
            ] = column;
          }
        }
      }
      console.log(JSON.stringify(dominanceData));
    }
  );
}

function fetchUnplacedFurs() {
  let max = 136;
  // for (let fur in Object.keys(dominanceData.furs.placed)) {
  //   console.log(fur);
  //   if (dominanceData.furs.placed[fur] > max) {
  //     max = dominanceData.furs.placed[fur];
  //   }
  // }
  // console.log(max);

  var furRanges = [
    `Fur!B2:B${max}`,
    `Fur!C2:C${max}`,
    `Fur!D2:D${max}`,
    `Fur!E2:E${max}`,
  ];

  let merges = [];

  sheets.spreadsheets.get(
    {
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      ranges: furRanges,
    },
    function (err, response) {
      if (err) {
        console.error(err);
      } else {
        let sheetData = response.data.sheets;
        for (sheet in sheetData) {
          for (merge in sheetData[sheet].merges) {
            console.log(JSON.stringify(sheetData[sheet].merges[merge]));
          }
          for (column in sheetData[sheet].data) {
            for (row in sheetData[sheet].data[column].rowData) {
              if (
                !sheetData[sheet].data[column].rowData[row].hasOwnProperty(
                  "values"
                ) ||
                sheetData[sheet].data[column].rowData[row].values[FIRST_COLUMN]
                  .effectiveValue === undefined
              ) {
                continue;
              }
              console.log(
                `${JSON.stringify(
                  sheetData[sheet].data[column].rowData[row].values[0]
                    .effectiveValue.stringValue
                )} ${JSON.stringify(
                  sheetData[sheet].data[column].rowData[row].values[0]
                    .effectiveFormat.borders
                )}`
              );
              dominanceData["furs"].unplaced[
                sheetData[sheet].data[column].rowData[row].values[
                  FIRST_COLUMN
                ].effectiveValue.stringValue
              ] = parseInt(row) + 1;
            }
          }
        }
        console.log(JSON.stringify(dominanceData.furs.unplaced));
      }
    }
  );
}

fetchPlacedTraits();
//fetchUnplacedFurs();
let server = express();
server.use(bodyParser.json());
server.get("/", (req, res) => res.send(JSON.stringify(dominanceData)));
server.post("/furs", (req, res) => {
  let first = req.body.first;
  let second = req.body.second;
  let dominant =
    dominanceData["furs"]["placed"][first] <
    dominanceData["furs"]["placed"][second];
  if (dominant) {
    res.send(`${first} is dominant to ${second}`);
  } else {
    res.send(`${first} is recessive to ${second}`);
  }
});
server.listen(port, () => console.log(`app listening on port ${port}`));
