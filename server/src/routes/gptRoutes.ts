import { Router } from "express";

import {generateReview, getRoadmap, query} from "../controller/gptController";
import Project from "../models/projectModel";

const router = Router();

router.get("/generateReiew", generateReview);

router.get("/getRoadmap", getRoadmap);

router.post("/query",query);

export default router;