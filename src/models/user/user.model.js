const users = require("./user.mongo");

const { createCredentials } = require("../auth/auth.model");

async function createUserObject(user) {
    console.log(user.userId);
    try {
        await createCredentials(user.userId, user.userPassword);
    } catch (err) {
        throw new Error(err.message);
    }

    const newUser = object.assign(user, {
        patientDetails: [],
    });

    return newUser;
}

async function createUser(user) {
    await users.findByIdAndUpdate(
        {
            userId: user.userEmail,
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

module.exports = { addNewUser };
