import { Router } from "express";

import {generateReview} from "../controller/gptController";

const router = Router();

router.post("/generateReiew", generateReview);

export default router;