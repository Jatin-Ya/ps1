import { Router } from "express";
import { getAllerts } from "../controller/githubController";

const vulnarabilityRoutes = Router();

vulnarabilityRoutes.get("/alerts", getAllerts);

export default vulnarabilityRoutes;
