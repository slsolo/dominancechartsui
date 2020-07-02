// eslint-disable-next-line prettier/prettier
const { google } = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
let port = process.env.PORT || 3000;
const keys = require("./credentials.json");

let jwtClient = google.auth.fromJSON(keys);
jwtClient.scopes = SCOPES;
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
  "furs",
  "genesisEyes",
];
let dominanceData = {
  furs: {
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

async function fetchPlacedTraits() {
  jwtClient.authorize().then(() => {
    sheets.spreadsheets.values
      .batchGet({
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
      })
      .then((response) => {
        let sheetData = response.data.valueRanges;
        console.log(JSON.stringify(sheetData));
        for (sheet in sheetData) {
          for (column in sheetData[sheet].values) {
            if (sheetData[sheet].values[column].length === 0) {
              break;
            }

            dominanceData[dominanceDataKeys[sheet]].placed[
              sheetData[sheet].values[column][0]
            ] = column;
          }
        }
        return dominanceData;
      })
      .catch((err) => {
        return {};
      });
  });
}

// setInterval(fetchPlacedTraits, 0.5 * 60 * 1000);
dominanceData = fetchPlacedTraits();

let server = express();
server.use(cors());
server.use(bodyParser.json());
server.get("/furs", (req, res) => {
  res.json(Object.keys(dominanceData.furs.placed).sort());
});
server.post("/furs", (req, res) => {
  let first = req.body.first;
  let second = req.body.second;
  let firstGenesis = first.startsWith("Genesis");
  let secondGenesis = second.startsWith("Genesis");
  let dominant = false;
  if (firstGenesis & secondGenesis) {
    dominant =
      dominanceData["genesisFurs"]["placed"][first] <
      dominanceData["genesisFurs"]["placed"][second];
    if (dominant) {
      res.send(`${first} is dominant to ${second}`);
    } else {
      res.send(`${first} is recessive to ${second}`);
    }
  } else if (firstGenesis) {
    res.send(`${first} is dominant to ${second}`);
  } else if (secondGenesis) {
    res.send(`${first} is recessive to ${second}`);
  } else {
    dominant =
      dominanceData["furs"]["placed"][first] <
      dominanceData["furs"]["placed"][second];
    if (dominant) {
      res.send(`${first} is dominant to ${second}`);
    } else {
      res.send(`${first} is recessive to ${second}`);
    }
  }
});
server.get("/eyes", (req, res) => {
  res.json(Object.keys(dominanceDataeyes.placed).sort());
});
server.post("/eyes", (req, res) => {
  let first = req.body.first;
  let second = req.body.second;
  let firstGenesis = first.startsWith("Genesis");
  let secondGenesis = second.startsWith("Genesis");
  let dominant = false;
  if (firstGenesis & secondGenesis) {
    dominant =
      dominanceData["genesisEyes"]["placed"][first] <
      dominanceData["genesisEyes"]["placed"][second];
    if (dominant) {
      res.send(`${first} is dominant to ${second}`);
    } else {
      res.send(`${first} is recessive to ${second}`);
    }
  } else if (firstGenesis) {
    res.send(`${first} is dominant to ${second}`);
  } else if (secondGenesis) {
    res.send(`${first} is recessive to ${second}`);
  } else {
    dominant =
      dominanceData["eyes"]["placed"][first] <
      dominanceData["eyes"]["placed"][second];
    if (dominant) {
      res.send(`${first} is dominant to ${second}`);
    } else {
      res.send(`${first} is recessive to ${second}`);
    }
  }
});
server.use(express.static(path.join(__dirname, "client/build")));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
server.listen(port, () => console.log(`app listening on port ${port}`));
module.exports.fetchPlacedTraits = fetchPlacedTraits;
