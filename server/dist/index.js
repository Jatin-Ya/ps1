"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_1 = require("http");
(0, dotenv_1.config)();
const app_1 = __importDefault(require("./src/app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./src/config/config");
const server = (0, http_1.createServer)(app_1.default);
const connect = () => mongoose_1.default
    .connect(config_1.MONGO_CONNECTION_STRING)
    .then(() => console.log(`connected to ${config_1.MONGO_CONNECTION_STRING}`))
    .catch((err) => console.log(err));
server.listen(config_1.PORT, () => {
    console.log(`server running at ${config_1.PORT}`);
    connect();
});
