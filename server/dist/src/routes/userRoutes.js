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
const userModel_1 = __importDefault(require("../models/userModel"));
const router = (0, express_1.Router)();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userModel_1.default.findById(id).populate("projects");
    return res.send(user);
}));
router.get("/projects/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userModel_1.default.findById(id).populate("projects");
    return res.send(user === null || user === void 0 ? void 0 : user.projects);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query;
    const users = yield userModel_1.default.find(filters).populate("projects");
    return res.send(users);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    const user = yield userModel_1.default.create({ email, password, name, role });
    return res.send(user);
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const user = yield userModel_1.default.findOneAndDelete({ email });
    return res.send(user);
}));
router.get("/github/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userModel_1.default.findById(id);
    if (!user)
        return res.status(404).send("User not found");
    if (!user.githubId)
        return res.status(200).send({ msg: "Github not linked", linked: false });
    return res.status(200).send({ msg: "Github linked", linked: true });
}));
exports.default = router;
