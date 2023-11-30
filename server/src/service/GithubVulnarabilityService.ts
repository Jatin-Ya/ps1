import axios from "axios";
import { CodeScannerAlert, DependabotAlert } from "./types";

class GithubVulnarabilityService {
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
}

export default GithubVulnarabilityService;
