const users = require("./user.mongo");

const { createCredentials } = require("../auth/auth.model");

async function createUserObject(user) {
    console.log(user.userId);
    try {
        await createCredentials(user.userId, user.userPassword);
    } catch (err) {
        throw new Error(err.message);
    }

    const newUser = Object.assign(user, {
        patientDetails: [],
    });

    return newUser;
}

async function getUserById(userId) {
    const user = await users.findOne(
        {
            userId: userId,
        },
        { __v: 0, _id: 0 }
    );

    return user;
}

async function createUser(user) {
    await users.findOneAndUpdate(
        {
            userId: user.userId,
        },
        user,
        {
            upsert: true,
        }
    );
}

async function addNewUser(user) {
    const newUser = await createUserObject(user);
    await createUser(newUser);
}

module.exports = { addNewUser, getUserById };
