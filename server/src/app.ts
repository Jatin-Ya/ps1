import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./config/config";
import { globalErrorHandler } from "./middleware/global.error";
import githubRoutes from "./routes/githubRoutes";
import gptRoutes from "./routes/gptRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import managerRoutes from "./routes/managerRoutes";
import projectRoutes from "./routes/projectRoutes";
import path from "path";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGIN,
    })
);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/application", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
})

app.use("/api/v1/github", githubRoutes);
app.use("/api/v1/gpt", gptRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/managers", managerRoutes);
app.use("/api/v1/projects", projectRoutes);
app.get("/", (req, res) => {
    return res.send("Hello World!");
});

app.use(globalErrorHandler);

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

export default app;
