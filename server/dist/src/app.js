"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const global_error_1 = require("./middleware/global.error");
const githubRoutes_1 = __importDefault(require("./routes/githubRoutes"));
const gptRoutes_1 = __importDefault(require("./routes/gptRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const managerRoutes_1 = __importDefault(require("./routes/managerRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: config_1.CORS_ORIGIN,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/application", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
app.use("/api/v1/github", githubRoutes_1.default);
app.use("/api/v1/gpt", gptRoutes_1.default);
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/managers", managerRoutes_1.default);
app.use("/api/v1/projects", projectRoutes_1.default);
app.get("/", (req, res) => {
    return res.send("Hello World!");
});
app.use(global_error_1.globalErrorHandler);
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});
exports.default = app;
