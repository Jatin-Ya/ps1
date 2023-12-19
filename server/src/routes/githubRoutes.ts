import { Router } from "express";
import {
  fileContents,
  filePaths,
  getCodeScannerAlerts,
  getDependabotAlerts,
  getFiles,
  getRepos,
} from "../controller/githubController";

const githubRoutes = Router();

githubRoutes.get("/dependabot/alerts", getDependabotAlerts);
githubRoutes.get("/code-scanner/alerts", getCodeScannerAlerts);
githubRoutes.get("/files", getFiles);
githubRoutes.get("/filePaths", filePaths);
githubRoutes.get("/fileContents", fileContents);
githubRoutes.get("/repos", getRepos);

export default githubRoutes;
