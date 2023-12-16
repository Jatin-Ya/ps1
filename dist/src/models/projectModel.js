"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    manager: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    users: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
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
        default: "open"
    },
    progress: {
        type: Number,
        required: false,
        default: 0
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
});
const Project = mongoose_1.default.model("Project", projectSchema);
exports.default = Project;
