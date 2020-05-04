// eslint-disable-next-line prettier/prettier
const {
  google
} = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
let port = process.env.PORT || 3000;
const keys = JSON.parse(process.env.GOOGLE_CREDENTIALS);

async function auth() {
  let jwtClient = google.auth.fromJSON(keys);
  jwtClient.scopes = SCOPES;
  return jwtClient.authorize();
}

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
let sheets = google.sheets("v4");

function fetchPlacedTraits() {
  auth().then((jwtClient) => {
    sheets.spreadsheets.values.batchGet({
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
              if (sheetData[sheet].values[column].length === 0) {
                break;
              }

              console.log(JSON.stringify(sheetData[sheet].values[column][0]));
              dominanceData[dominanceDataKeys[sheet]].placed[
                sheetData[sheet].values[column][0]
              ] = column;
            }
          }
        }
        console.log(JSON.stringify(dominanceData));
      }
    );
  });
}

setInterval(fetchPlacedTraits, 0.5 * 60 * 1000);

let server = express();
server.use(bodyParser.json());
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
server.use(express.static(path.join(__dirname, "client/build")));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
server.listen(port, () => console.log(`app listening on port ${port}`));