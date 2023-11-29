import { Router } from "express";

import { gptController } from "../controllers/gptController";

const router = Router();

router.post("/generateReiew", gptController.generateReiew);

export default router;