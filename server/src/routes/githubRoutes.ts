import { Router } from "express";
import {
    getCodeScannerAlerts,
    getDependabotAlerts,
    getFiles,
    getRepos,
} from "../controller/githubController";

const githubRoutes = Router();

githubRoutes.get("/dependabot/alerts", getDependabotAlerts);
githubRoutes.get("/code-scanner/alerts", getCodeScannerAlerts);
githubRoutes.get("/files", getFiles);
githubRoutes.get("/repos", getRepos);


export default githubRoutes;
