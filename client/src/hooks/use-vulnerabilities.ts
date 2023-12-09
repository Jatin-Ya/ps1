import { useEffect, useState } from "react";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

export type Vulnerability = {
    id: string;
    title: string;
    description: string;
    severity: string;
    status: string;
    remediation: string;
    repo: string;
    file: string;
    line: number;
    commit: string;
    date: string;
};

const DUMMY_VULNERABILITIES: Vulnerability[] = [
    {
        id: "1",
        title: "title1",
        description: "description1",
        severity: "high",
        status: "open",
        remediation: "remediation1",
        repo: "repo1",
        file: "file1",
        line: 1,
        commit: "commit1",
        date: "date1",
    },
    {
        id: "2",
        title: "title2",
        description: "description2",
        severity: "low",
        status: "open",
        remediation: "remediation2",
        repo: "repo2",
        file: "file2",
        line: 2,
        commit: "commit2",
        date: "date2",
    },
    {
        id: "3",
        title: "title3",
        description: "description3",
        severity: "medium",
        status: "open",
        remediation: "remediation3",
        repo: "repo3",
        file: "file3",
        line: 3,
        commit: "commit3",
        date: "date3",
    },
];

export const useVelnerabilities = (projectId: string) => {
    const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

    const getVulnerabilities = async (): Promise<Vulnerability[]> => {
        return DUMMY_VULNERABILITIES;
        // Get vulnerabilities from backend
        const baseUrl = getBackendBaseUrl();
        const response = await axios.get(
            `${baseUrl}/code-scanner/alerts?projectId=${projectId}`
        );

        return response.data;
    };

    useEffect(() => {
        getVulnerabilities().then((vulnerabilities) =>
            setVulnerabilities(vulnerabilities)
        );
    }, []);

    return { vulnerabilities };
};
