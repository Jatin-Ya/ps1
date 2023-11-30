import { Router } from "express";
import {
    getCodeScannerAlerts,
    getDependabotAlerts,
} from "../controller/vulnarabilityController";

const vulnarabilityRoutes = Router();

vulnarabilityRoutes.get("/dependabot/alerts", getDependabotAlerts);
vulnarabilityRoutes.get("/code-scanner/alerts", getCodeScannerAlerts);

export default vulnarabilityRoutes;
