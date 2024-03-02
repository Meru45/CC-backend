const mongoose = require("mongoose");

const users = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Credentials", users);
