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
const axios_1 = __importDefault(require("axios"));
class GithubService {
    getDependabotAlerts(accessToken, ownerName, repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.github.com/repos/${ownerName}/${repoName}/dependabot/alerts`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "X-Github-Api-Version": "2022-11-28",
            };
            const result = yield axios_1.default.get(url, { headers });
            return result.data;
        });
    }
    getCodeScannerAlerts(accessToken, ownerName, repoName) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.github.com/repos/${ownerName}/${repoName}/code-scanning/alerts`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "X-Github-Api-Version": "2022-11-28",
            };
            const result = yield axios_1.default.get(url, { headers });
            return result.data;
        });
    }
    getFiles(accessToken, ownerName, repoName, paths) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.github.com/repos/${ownerName}/${repoName}/contents`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "X-Github-Api-Version": "2022-11-28",
            };
            const resultObj = {};
            for (const path of paths) {
                const pathUrl = `${url}/${path}`;
                const result = yield axios_1.default.get(pathUrl, { headers });
                const base64Content = result.data.content;
                const content = Buffer.from(base64Content, "base64").toString("utf-8");
                resultObj[path] = content;
            }
            return resultObj;
        });
    }
    getPathsOfFilesFromBranch(accessToken, ownerName, repoName, branchName) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.github.com/repos/${ownerName}/${repoName}/git/trees/${branchName}?recursive=1`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "X-Github-Api-Version": "2022-11-28",
            };
            const result = yield axios_1.default.get(url, { headers });
            const noprmalFiles = result.data.tree.filter((file) => file.mode === "100644");
            const paths = noprmalFiles.map((file) => file.path);
            return paths;
        });
    }
    getRepos(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.github.com/user/repos`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
                "X-Github-Api-Version": "2022-11-28",
            };
            const result = yield axios_1.default.get(url, { headers });
            const repos = result.data.map((repo) => {
                return {
                    repoName: repo.name,
                    repoOwner: repo.owner.login,
                    repoUrl: repo.html_url,
                    repoId: repo.id,
                    // repoName, repoOwner, repoUrl, repoId
                };
            });
            return repos;
        });
    }
}
exports.default = GithubService;
