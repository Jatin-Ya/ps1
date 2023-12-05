import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    task:
    {
        type: {
            title: String,
            description: String,
            status: String,
            progress: Number,
            guidlines: String,
        },
        required: true,
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;

