const asyncHandler = require("express-async-handler");

const {
    findUser,
    checkPassword,
    updatePassword,
} = require("../../models/auth/auth.model");

const checkRequestData = require("../../services/checkRequestData");

const { addNewUser } = require("../../models/user/user.model");

const { createJWT, verifyRefreshToken } = require("../../services/createJWT");

const USER_EXAMPLE = {
    userName: "Jon Doe",
    userId: "Jon117",
    userEmail: "JonDoe@gmail.com",
    userPassword: "Secrete",
};

async function httpLogin() {}

async function httpUpdatePassowrd() {}

async function httpRefresh() {}

async function httpLogout() {}

async function httpSignUp(req, res) {
    let user;
    try {
        user = checkRequestData(USER_EXAMPLE, req.body);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }

    const exitsUser = await findUser(user.userId);
    console.log(exitsUser);
    if (exitsUser) {
        return res.status(400).json({
            error: "User already exits",
        });
    }

    try {
        await addNewUser(user);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
}

module.exports = {
    httpLogin: httpLogin,
    httpUpdatePassowrd: httpUpdatePassowrd,
    httpRefresh: httpRefresh,
    httpLogout: httpLogout,
    httpSignUp: httpSignUp,
};
