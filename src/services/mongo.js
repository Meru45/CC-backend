const mongoose = require("mongoose");

require("dotenv").config();
const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
// const MONGO_URL = `mongodb+srv://CaffinatedCoders:${password}@cluster0.d5c0kvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const MONGO_URL = "mongodb://localhost:27017/";

mongoose.connection.once("open", () => {
    console.log("MongoDB, connection ready");
});

mongoose.connection.on("error", (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect(MONGO_URL);
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
};
