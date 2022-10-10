const express = require("express");
const mongoose = require("mongoose");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index.ejs');
});

app.listen(port, () => {
  console.log("Cblog uygulaması ayağa kalktı.");
});
