import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "open",
    },
    progress: {
        type: Number,
        required: false,
        default: 0,
    },
    guidlines: {
        type: String,
        required: true,
    },
    repoDetails: {
        type: {
            repoName: String,
            repoOwner: String,
            repoUrl: String,
            repoId: String,
        },
        required: false,
    },
    aiSupport: {
        type: Boolean,
        required: true,
        default: false,
    },
    roadmap: {
        type: [String],
        required: false,
        default: [],
    },
    milestones: {
        type: [{ status: String }],
        required: false,
        default: [],
    },
    queries: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Query",
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
