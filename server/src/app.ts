import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./config/config";
import { globalErrorHandler } from "./middleware/global.error";
import vulnarabilityRoutes from "./routes/vulnarabilityRoutes";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGIN,
    })
);

app.use("/api/v1/vulnarabilities", vulnarabilityRoutes);
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
