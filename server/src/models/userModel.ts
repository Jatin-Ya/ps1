import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    githubId: {
        type: {
            userName: String,
            accessToken: String,
        },
        required: false,
    },
});

const User = mongoose.model("User", userSchema);

export default User;