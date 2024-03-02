const mongoose = require("mongoose");

const users = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User Credentials", users);
