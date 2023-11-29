import { Router } from "express";
import { getAllerts } from "../controller/vulnarabilityController";

const vulnarabilityRoutes = Router();

vulnarabilityRoutes.get("/alerts", getAllerts);

export default vulnarabilityRoutes;
