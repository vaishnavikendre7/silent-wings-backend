const db = require('./db'); // connects to MySQL

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Silent Wings Backend is running...");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
