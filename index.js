import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import MongoClient from "mongodb";

import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getState", (req, res) => {
  console.log("Got this");
  console.log(JSON.stringify(state));
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(state));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/test/index.html");
});

if (crypto) console.log("Got crypto.");

MongoClient.connect(
  "mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
  }
);

const state = {
  a: 4,
  b: 5,
  c: 6,
  a: 15,
};

const state2 = {
  b: 12,
};

Object.assign(state, state2);

console.log(state, { ...state2 });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
