const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "please add your username"],
        },
        email: {
            type: String,
            required: [true, "please add your email address"],
            unique: [true, "this email address already exists"]
        },
        password: {
            type: String,
            required: [true, "please add your password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
