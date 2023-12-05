import axios from "axios";
import { CodeScannerAlert, DependabotAlert, FilesResult, File } from "./types";

class GithubService {
    async getDependabotAlerts(
        accessToken: string,
        ownerName: string,
        repoName: string
    ): Promise<DependabotAlert[]> {
        const url = `https://api.github.com/repos/${ownerName}/${repoName}/dependabot/alerts`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            "X-Github-Api-Version": "2022-11-28",
        };

        const result = await axios.get<DependabotAlert[]>(url, { headers });
        return result.data;
    }

    async getCodeScannerAlerts(
        accessToken: string,
        ownerName: string,
        repoName: string
    ): Promise<CodeScannerAlert[]> {
        const url = `https://api.github.com/repos/${ownerName}/${repoName}/code-scanning/alerts`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            "X-Github-Api-Version": "2022-11-28",
        };

        const result = await axios.get<CodeScannerAlert[]>(url, { headers });
        return result.data;
    }

    async getFiles(
        accessToken: string,
        ownerName: string,
        repoName: string,
        paths: string[]
    ): Promise<FilesResult> {
        const url = `https://api.github.com/repos/${ownerName}/${repoName}/contents`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            "X-Github-Api-Version": "2022-11-28",
        };

        const resultObj: FilesResult  = {};

        for (const path of paths) {
            const pathUrl = `${url}/${path}`;
            const result = await axios.get<File>(pathUrl, { headers });
            const base64Content = result.data.content;
            const content = Buffer.from(base64Content, "base64").toString("utf-8");
            resultObj[path] = content;
        }

        return resultObj;
    }

    async getPathsOfFilesFromBranch(
        accessToken: string,
        ownerName: string,
        repoName: string,
        branchName: string
    ): Promise<string[]> {
        const url = `https://api.github.com/repos/${ownerName}/${repoName}/git/trees/${branchName}?recursive=1`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            "X-Github-Api-Version": "2022-11-28",
        };

        const result = await axios.get(url, { headers });

        const noprmalFiles = result.data.tree.filter((file: any) => file.mode === "100644");

        const paths = noprmalFiles.map((file: any) => file.path);

        return paths;
    }

    async getRepos(accessToken: string): Promise<string[]> {
        const url = `https://api.github.com/user/repos`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            "X-Github-Api-Version": "2022-11-28",
        };

        const result = await axios.get(url, { headers });

        const repos = result.data.map((repo: any) =>{
            return {
                repoName: repo.name,
                repoOwner: repo.owner.login,
                repoUrl: repo.html_url,
                repoId: repo.id,
                // repoName, repoOwner, repoUrl, repoId
            }
        });

        return repos;
    }
}

export default GithubService;
