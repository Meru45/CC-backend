const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv");

const dashboard = require("./routes/dashboardWrapper");
const authRouter = require("./routes/auth/auth.router");

// const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(
    cors({
        origin: "http://localhost:4000", //change this in production
    })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/dashboard", dashboard);
app.use("/auth", authRouter);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
