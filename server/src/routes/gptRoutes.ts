import { Router } from "express";

import {generateReview, getRoadmap} from "../controller/gptController";
import Project from "../models/projectModel";

const router = Router();

router.get("/generateReiew", generateReview);

router.get("/getRoadmap", getRoadmap)

export default router;