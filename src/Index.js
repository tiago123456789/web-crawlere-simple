const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routesApp = require("./Route");

const app = express();

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(routesApp);

app.listen(3000, () => console.log("Server started on address: http://localhost:3000"));