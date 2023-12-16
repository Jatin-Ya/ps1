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
exports.query = exports.getRoadmap = exports.generateReview = void 0;
const OpenAiSercvice_1 = require("../service/OpenAiSercvice");
const projectModel_1 = __importDefault(require("../models/projectModel"));
const GithubService_1 = __importDefault(require("../service/GithubService"));
const app_error_1 = require("../error/app.error");
const gptService = new OpenAiSercvice_1.OpenAiService();
const githubService = new GithubService_1.default();
const generateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { path, projectId } = req.query;
    const project = yield projectModel_1.default.findById(projectId).populate("users");
    const user = project === null || project === void 0 ? void 0 : project.users[0];
    const token = (_a = user === null || user === void 0 ? void 0 : user.githubId) === null || _a === void 0 ? void 0 : _a.accessToken;
    const ownerName = (_b = project === null || project === void 0 ? void 0 : project.repoDetails) === null || _b === void 0 ? void 0 : _b.repoOwner;
    const repoName = (_c = project === null || project === void 0 ? void 0 : project.repoDetails) === null || _c === void 0 ? void 0 : _c.repoName;
    if (!token)
        return next((0, app_error_1.error401)("Unauthorized"));
    if (!ownerName)
        return next((0, app_error_1.error401)("Unauthorized"));
    if (!repoName)
        return next((0, app_error_1.error401)("Unauthorized"));
    try {
        const fileContent = yield githubService.getFiles(token, ownerName, repoName, [path]);
        const prompt = project === null || project === void 0 ? void 0 : project.guidlines;
        const review = yield gptService.analyzeFile(fileContent[path], prompt);
        res.json({ review });
    }
    catch (err) {
        next(err);
    }
    // const files = await getFilesAndPaths();
    // const review = await gpt3.generateReview(prompt);
});
exports.generateReview = generateReview;
const getRoadmap = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    const project = yield projectModel_1.default.findById(projectId);
    if (!project)
        return next((0, app_error_1.error400)("Project not found"));
    const guidlines = (project === null || project === void 0 ? void 0 : project.guidlines) || "";
    const description = (project === null || project === void 0 ? void 0 : project.description) || "";
    const title = (project === null || project === void 0 ? void 0 : project.title) || "";
    try {
        const roadmap = yield gptService.generateRoadmap(guidlines, description, title);
        res.json({ roadmap });
    }
    catch (err) {
        next(err);
    }
});
exports.getRoadmap = getRoadmap;
const query = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const { query, path, projectId } = req.body;
    try {
        const project = yield projectModel_1.default.findById(projectId).populate("users");
        const user = project === null || project === void 0 ? void 0 : project.users[0];
        const token = (_d = user === null || user === void 0 ? void 0 : user.githubId) === null || _d === void 0 ? void 0 : _d.accessToken;
        const ownerName = (_e = user === null || user === void 0 ? void 0 : user.githubId) === null || _e === void 0 ? void 0 : _e.name;
        const repoName = (_f = project === null || project === void 0 ? void 0 : project.repoDetails) === null || _f === void 0 ? void 0 : _f.repoName;
        if (!token)
            return next((0, app_error_1.error401)("Unauthorized"));
        if (!ownerName)
            return next((0, app_error_1.error401)("Unauthorized"));
        if (!repoName)
            return next((0, app_error_1.error401)("Unauthorized"));
        const file = yield githubService.getFiles(token, ownerName, repoName, [path]);
        const response = yield gptService.query(query, file[path]);
        res.json({ response });
    }
    catch (err) {
        next(err);
    }
});
exports.query = query;
