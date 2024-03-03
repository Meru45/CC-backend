const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

async function createJWT(id) {
    const accessToken = jwt.sign(
        {
            userInfo: {
                userId: id,
            },
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15min",
        }
    );

    const refreshToken = jwt.sign(
        {
            userInfo: {
                userId: id,
            },
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return { accessToken, refreshToken };
}

module.exports = { createJWT };
