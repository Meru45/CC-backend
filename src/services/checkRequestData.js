function checkRequestData(trueObject, otherObject) {
    if (typeof trueObject !== "object" || typeof otherObject !== "object") {
        throw new Error(
            "Formating of the data is not correct it should be an object"
        );
    }

    const trueObjectKeys = Object.keys(trueObject);

    if (Object.keys(otherObject).length < trueObjectKeys.length) {
        throw new Error("Missing Data");
    }

    if (Object.keys(otherObject).length > trueObjectKeys.length) {
        throw new Error("Extra Data");
    }

    for (const key of trueObjectKeys) {
        if (!(key in otherObject)) {
            throw new Error(`The data field ${key} is empty.`);
        }

        if (typeof trueObject[key] !== typeof otherObject[key]) {
            throw new Error(`Type of ${key} is ${typeof trueObject[key]}.`);
        }

        if (typeof trueObject[key] === "object" && trueObject[key] !== null) {
            if (!checkRequestData(trueObject[key], otherObject[key])) {
                throw new Error("The structure of data is not correct.");
            }
        }
    }

    return otherObject;
}

module.exports = checkRequestData;
