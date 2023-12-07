import { config } from "dotenv";
import { createServer } from "http";
config();
import app from "./src/app";

import mongoose from "mongoose";
import {
    MONGO_CONNECTION_STRING,
    PORT,
} from "./src/config/config";

const server = createServer(app);

const connect = () =>
    mongoose
        .connect(MONGO_CONNECTION_STRING)
        .then(() => console.log(`connected to ${MONGO_CONNECTION_STRING}`))
        .catch((err) => console.log(err));

server.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
    connect();
});
