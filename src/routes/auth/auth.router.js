const express = require("express");

const loginLimiter = require("../../middlewares/loginLimitter");
const {
    httpLogin,
    httpUpdatePassowrd,
    httpRefresh,
    httpLogout,
    httpSignUp,
} = require("./auth.controller");

const verifyToken = require("../../middlewares/verifyToken");

const authRouter = express.Router();

authRouter.route("/login").post(loginLimiter, httpLogin);
authRouter.route("/logout").post(httpLogout);
authRouter.route("/singup").post(httpSignUp);
authRouter.route("/update-password").put(verifyToken, httpUpdatePassowrd);
authRouter.route("/refresh").get(httpRefresh);

module.exports = authRouter;
