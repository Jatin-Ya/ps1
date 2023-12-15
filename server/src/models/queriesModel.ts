import mongoose, { Schema } from "mongoose";

const querySchema = new Schema({
    query: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "escalated",
    },
});

const Query = mongoose.model("Query", querySchema);

export default Query;
