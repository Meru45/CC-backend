const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

async function createJWT(id) {
    const accessToken = jwt.sign(
        {
            userInfo: {
                id: id,
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

async function verifyRefreshToken(refreshToken) {
    let message;
    let accessToken;

    try {
        await jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            asyncHandler(async (err, decoded) => {
                if (err) {
                    message = "Forbidden";
                    return;
                }
                const foundUser = await exitsAdminWithId(
                    decoded.userInfo.userId
                );
                if (!foundUser) {
                    message = "Unauthorized";
                    return;
                }

                accessToken = jwt.sign(
                    {
                        userInfo: {
                            userId: foundUser.id,
                        },
                    },
                    ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "15min",
                    }
                );
            })
        );
    } catch (err) {
        console.error("Error during token verification:", err);
        message = "Forbidden";
    }

    return { accessToken, message };
}

module.exports = { createJWT, verifyRefreshToken };
