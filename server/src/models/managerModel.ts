import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
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
});

const Manager = mongoose.model("Manager", managerSchema);

export default Manager;