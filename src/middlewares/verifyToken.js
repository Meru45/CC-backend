const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.id = decoded.userInfo.userId;
        req.master = decoded.userInfo.master;
        req.admin = decoded.userInfo.admin;
        req.active = decoded.userInfo.active;
        next();
    });
}

module.exports = verifyToken;
