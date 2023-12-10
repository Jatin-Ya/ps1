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

type Resp = {
    most_recent_instance: {
        location: {
            path: string;
        };
        message: { text: string };
    };
    rule: {
        description: string,
        id: string,
        security_severity_level: string,
    };
    state: string;
    updated_at: string;
};

export const useVelnerabilities = (projectId: string) => {
    const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

    const getVulnerabilities = async (): Promise<Vulnerability[]> => {
        // Get vulnerabilities from backend
        const baseUrl = getBackendBaseUrl();
        const response = await axios.get< Resp[]>(
            `${baseUrl}/github/code-scanner/alerts?projectId=${projectId}`
        );

        const data = response.data;
        console.log(data);

        const vulnerabilities = data.map((alert) => ({
            id: alert.rule.id,
            title: alert.rule.description,
            description: alert.most_recent_instance.message.text,
            severity: alert.rule.security_severity_level,
            status: alert.state,
            remediation: "remediation1",
            repo: "repo1",
            file: alert.most_recent_instance.location.path,
            line: 1,
            commit: "commit1",
            date: alert.updated_at,
        }));

        return vulnerabilities;
        return DUMMY_VULNERABILITIES;
    };

    useEffect(() => {
        getVulnerabilities().then((vulnerabilities) =>
            setVulnerabilities(vulnerabilities)
        );
    }, []);

    return { vulnerabilities };
};
