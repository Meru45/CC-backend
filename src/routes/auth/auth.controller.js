const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const {
    findUser,
    checkPassword,
    updatePassword,
} = require("../../models/auth/auth.model");

const checkRequestData = require("../../services/checkRequestData");

const { addNewUser, getUserById } = require("../../models/user/user.model");

const { createJWT } = require("../../services/createJWT");

const USER_EXAMPLE = {
    userName: "Jon Doe",
    userId: "Jon117",
    userEmail: "JonDoe@gmail.com",
    userPassword: "Secrete",
};

const httpLogin = asyncHandler(async (req, res) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({
            error: "Missing Data",
        });
    }

    const exitsAdmin = await findUser(userId);
    if (!exitsAdmin) {
        return res.status(401).json({
            error: "This login ID does not exits",
        });
    }

    const passValidity = await checkPassword(password, userId);

    if (!passValidity) {
        return res.status(401).json({
            error: "Invalid Password",
        });
    }

    const { accessToken, refreshToken } = await createJWT(userId);
    const user = await getUserById(userId);

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        accessToken: accessToken,
        userLoggedIn: true,
        userInfo: user,
    });
    console.log(req);
});

async function httpUpdatePassowrd() {}

async function httpRefresh(req, res) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden" });

            const foundUser = await findUser(decoded.userInfo.userId);

            if (!foundUser)
                return res.status(401).json({ message: "Unauthorized" });

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser.userId,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            res.json({ accessToken });
        })
    );
}

async function httpLogout(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared" });
}

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
