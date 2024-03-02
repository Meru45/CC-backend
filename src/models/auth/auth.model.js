const bcrypt = require("bcrypt");
const users = require("./auth.mongo");

async function findUser(id) {
    return await users.findOne({
        id: id,
    });
}

async function checkPassword(pass, id) {
    const user = await findUser({ id: id });
    return await bcrypt.compare(pass, user.password);
}

async function createCredentials(id, pass) {
    const passwordHash = await bcrypt.hash(pass, 10);

    await users.findOneAndUpdate(
        {
            id: id,
        },
        {
            id: id,
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
        id: id,
        password: hashedPassword,
    };

    await users.findByIdAndUpdate({ id: id }, updatedUser, {
        returnOriginal: false,
    });
}

module.exports = {
    createCredentials,
    findUser,
    updatePassword,
    checkPassword,
};
