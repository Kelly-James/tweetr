"use strict";

const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const tweetsApi   = require('./api/tweets');
const dbLib       = require('./lib/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

dbLib.connect((dbInstance) => {
  app.use('/tweets', tweetsApi(dbInstance));

  // Jeremy moved this out of perfectionism
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
