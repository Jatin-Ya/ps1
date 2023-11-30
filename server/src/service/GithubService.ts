import axios from "axios";
import { type } from "os";

type Vulnarability = {
    number: 2;
    state: string;
    dependency: {
        package: {
            ecosystem: string;
            name: string;
        };
        manifest_path: string;
        scope: string;
    };
    security_advisory: {
        ghsa_id: string;
        cve_id: string;
        summary: string;
        description: string;
        vulnerabilities: {
            package: {
                ecosystem: string;
                name: string;
            };
            severity: string;
            vulnerable_version_range: string;
            first_patched_version: {
                identifier: string;
            };
        }[];

        severity: string;
        cvss: {
            vector_string: string;
            score: number;
        };
        cwes: {
            cwe_id: string;
            name: string;
        }[];
        identifiers: {
            type: string;
            value: string;
        }[];
        references: {
            url: string;
        }[];

        published_at: string;
        updated_at: string;
        withdrawn_at: string;
    };
};

type File = {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    content: string;
    encoding: string;
    _links: {
        self: string;
        git: string;
        html: string;
    };
};

type FilesResult = {
    [path: string]: string;
};

class GithubService {
    async getVelnerabilities(
        accessToken: string,
        ownerName: string,
        repoName: string
    ): Promise<Vulnarability[]> {
        const url = `https://api.github.com/repos/${ownerName}/${repoName}/dependabot/alerts`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
            "X-Github-Api-Version": "2022-11-28",
        };

        const result = await axios.get<Vulnarability[]>(url, { headers });
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
}

export default GithubService;
