"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepos =
    exports.getFiles =
    exports.getCodeScannerAlerts =
    exports.getDependabotAlerts =
        void 0;
const GithubService_1 = __importDefault(require("../service/GithubService"));
const app_error_1 = require("../error/app.error");
const GithubUtils_1 = require("../utils/GithubUtils");
const userModel_1 = __importDefault(require("../models/userModel"));
const projectModel_1 = __importDefault(require("../models/projectModel"));
const githubService = new GithubService_1.default();
const getDependabotAlerts = (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { projectId } = req.query;
        // const headers = req.headers.authorization;
        // const token = headers?.split(" ")[1];
        const project = yield projectModel_1.default
            .findById(projectId)
            .populate("users");
        const user =
            project === null || project === void 0 ? void 0 : project.users[0];
        if (!user) return next((0, app_error_1.error401)("Unauthorized"));
        const ownerName =
            (_a = user === null || user === void 0 ? void 0 : user.githubId) ===
                null || _a === void 0
                ? void 0
                : _a.userName;
        const repoName =
            project === null || project === void 0 ? void 0 : project.repoName;
        const token =
            (_b = user === null || user === void 0 ? void 0 : user.githubId) ===
                null || _b === void 0
                ? void 0
                : _b.accessToken;
        if (!token) return next((0, app_error_1.error401)("Unauthorized"));
        try {
            const alerts = yield githubService.getDependabotAlerts(
                token,
                ownerName,
                repoName
            );
            next((0, app_error_1.success200)(alerts));
        } catch (err) {
            next((0, app_error_1.error400)("Could'nt fetch dependabot alerts"));
        }
    });
exports.getDependabotAlerts = getDependabotAlerts;
const getCodeScannerAlerts = (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        const { projectId } = req.query;
        // const headers = req.headers.authorization;
        // const token = headers?.split(" ")[1];
        const project = yield projectModel_1.default
            .findById(projectId)
            .populate("users");
        const user =
            project === null || project === void 0 ? void 0 : project.users[0];
        if (!user) return next((0, app_error_1.error401)("Unauthorized"));
        const ownerName =
            (_c = user === null || user === void 0 ? void 0 : user.githubId) ===
                null || _c === void 0
                ? void 0
                : _c.userName;
        const repoName =
            project === null || project === void 0 ? void 0 : project.repoName;
        const token =
            (_d = user === null || user === void 0 ? void 0 : user.githubId) ===
                null || _d === void 0
                ? void 0
                : _d.accessToken;
        if (!token) return next((0, app_error_1.error401)("Unauthorized"));
        try {
            const alerts = yield githubService.getCodeScannerAlerts(
                token,
                ownerName,
                repoName
            );
            next((0, app_error_1.success200)(alerts));
        } catch (err) {
            next(
                (0, app_error_1.error400)("Could'nt fetch code scanner alerts")
            );
        }
    });
exports.getCodeScannerAlerts = getCodeScannerAlerts;
const getFiles = (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
        const { projectId } = req.query;
        const project = yield projectModel_1.default
            .findById(projectId)
            .populate("users");
        const user =
            project === null || project === void 0 ? void 0 : project.users[0];
        if (!user) return next((0, app_error_1.error401)("Unauthorized"));
        const ownerName =
            (_e = user === null || user === void 0 ? void 0 : user.githubId) ===
                null || _e === void 0
                ? void 0
                : _e.userName;
        const repoName =
            project === null || project === void 0 ? void 0 : project.repoName;
        const token =
            (_f = user === null || user === void 0 ? void 0 : user.githubId) ===
                null || _f === void 0
                ? void 0
                : _f.accessToken;
        if (!token) return next((0, app_error_1.error401)("Unauthorized"));
        try {
            const files = yield (0, GithubUtils_1.getFilesAndPaths)(
                token,
                ownerName,
                repoName
            );
            next((0, app_error_1.success200)(files));
        } catch (err) {
            next((0, app_error_1.error401)("Unauthorized"));
        }
        // if (!token) return next(error401("Unauthorized"));
        // const paths = await githubService.getPathsOfFilesFromBranch(
        //     token,
        //     ownerName,
        //     repoName,
        //     "master"
        // );
        // const files = await githubService.getFiles(
        //     token,
        //     ownerName,
        //     repoName,
        //     paths
        // );
        // next(success200(files));
    });
exports.getFiles = getFiles;
const getRepos = (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
        var _g;
        console.log(req.query);
        const { email } = req.query;
        // const user = yield userModel_1.default.findById(id);
        const user = yield userModel_1.default.findOne({ email });
        const token =
            (_g = user === null || user === void 0 ? void 0 : user.githubId) ===
                null || _g === void 0
                ? void 0
                : _g.accessToken;
        console.log({ token, email, user });
        if (!token) return next((0, app_error_1.error401)("Unauthorized"));
        try {
            const repos = yield githubService.getRepos(token);
            next((0, app_error_1.success200)(repos));
        } catch (err) {
            next((0, app_error_1.error401)("Unauthorized"));
        }
    });
exports.getRepos = getRepos;
