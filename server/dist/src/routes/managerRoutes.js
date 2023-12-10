"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const managerModel_1 = __importDefault(require("../models/managerModel"));
const router = (0, express_1.Router)();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const manager = yield managerModel_1.default.findById(id).populate("projects");
    return res.send(manager);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const managers = yield managerModel_1.default.find(filters).populate("projects");
    return res.send(managers);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const manager = yield managerModel_1.default.create({ name, email, password });
    return res.send(manager);
}));
exports.default = router;
