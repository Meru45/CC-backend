const bcrypt = require("bcrypt");
const users = require("./auth.mongo");

async function findUser(id) {
    return await users.findOne({
        userId: id,
    });
}

async function checkPassword(pass, id) {
    const user = await findUser({ userId: id });
    return await bcrypt.compare(pass, user.password);
}

async function createCredentials(id, pass) {
    const passwordHash = await bcrypt.hash(pass, 10);

    await users.findOneAndUpdate(
        {
            userId: id,
        },
        {
            userId: id,
            password: passwordHash,
        },
        {
            upsert: true,
        }
    );
}

async function updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = {
        userId: id,
        password: hashedPassword,
    };

    await users.findOneAndUpdate({ userId: id }, updatedUser, {
        returnOriginal: false,
    });
}

module.exports = {
    createCredentials,
    findUser,
    updatePassword,
    checkPassword,
};
