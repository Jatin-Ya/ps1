import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./config/config";
import { globalErrorHandler } from "./middleware/global.error";


const app = express();

app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGIN,
    })
);

app.use(globalErrorHandler);

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

export default app;
