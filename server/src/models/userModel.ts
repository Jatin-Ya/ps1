import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
    role: {
        type: String,
        required: true,
        default: "User",
    },
    githubId: {
        type: {
            name: String,
            accessToken: String,
        },
        required: false,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
