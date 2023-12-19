"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gptController_1 = require("../controller/gptController");
const router = (0, express_1.Router)();
router.get("/generateReiew", gptController_1.generateReview);
router.get("/getRoadmap", gptController_1.getRoadmap);
router.post("/query", gptController_1.query);
exports.default = router;
