const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dashboard = require("../routes/dashboardWrapper");

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000", //change this in production
    })
);

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/dashboard", dashboard);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
