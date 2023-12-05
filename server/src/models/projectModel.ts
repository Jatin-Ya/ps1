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
    description : {
        type: String,
        required: true,
    },
    status : {
        type: String,
        required: true,
        default: "open"
    },
    progress : {
        type: Number,
        required: false,
        default: 0
    },
    guidlines : {
        type: String,
        required: true,
    },
    repoDetails : {
        type: {
            repoName: String,
            repoOwner: String,
            repoUrl: String,
            repoId: String,
        },
        required: false,
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;

