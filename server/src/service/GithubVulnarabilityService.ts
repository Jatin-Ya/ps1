import axios from "axios";

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

class GithubVulnarabilityService {
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
}

export default GithubVulnarabilityService;
