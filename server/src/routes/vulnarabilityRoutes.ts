import { Router } from "express";
import {
    getCodeScannerAlerts,
    getDependabotAlerts,
} from "../controller/githubController";

const vulnarabilityRoutes = Router();

vulnarabilityRoutes.get("/dependabot/alerts", getDependabotAlerts);
vulnarabilityRoutes.get("/code-scanner/alerts", getCodeScannerAlerts);

export default vulnarabilityRoutes;
