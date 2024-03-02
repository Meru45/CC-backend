const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing whitespace
    },
    userId: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    patientDetails: [
        {
            patientName: {
                type: String,
                required: true,
                trim: true,
            },
            patientAge: {
                type: Number,
                required: true,
            },
            patientReport: {
                type: {
                    rbcCount: {
                        type: Number,
                        required: true,
                    },
                    wbcCount: {
                        type: Number,
                        required: true,
                    },
                    hemoglobinCount: {
                        type: Number,
                        required: true,
                    },
                    hasMalaria: {
                        type: Boolean,
                        required: true,
                    },
                },
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("User", userSchema);
