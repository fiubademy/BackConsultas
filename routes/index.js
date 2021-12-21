const express = require("express");
const app = express();

app.use("/", require("./chats"));

module.exports = app;
