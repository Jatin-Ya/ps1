import { Router } from "express";

import {generateReiew} from "../controller/gptController";

const router = Router();

router.post("/generateReiew", generateReiew);

export default router;