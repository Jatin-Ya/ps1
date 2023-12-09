import { useEffect, useState } from "react";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";

export type RepoFile = {
    path: string;
    name: string;
    content: string;
};

type RepoResponse = Record<string, string>;

const getFileName = (path: string) => path.split("/").pop() || "";

export const useRepoFiles = (projectId: string) => {
    const [repoFiles, setRepoFiles] = useState<RepoFile[]>([]);

    const getRepos = async (): Promise<RepoResponse> => {
        // Get repo files from backend
        const DummyResponse: RepoResponse = {
            "src/index.js": "console.log('Hello World')",
            "src/index.html": "<h1>Hello World</h1>",
        };
        return DummyResponse;

        const baseUrl = getBackendBaseUrl();
        const response = await axios.get(
            `${baseUrl}/github/files?projectId=${projectId}`
        );
        const repoFiles = response.data;
        return repoFiles;
    };

    useEffect(() => {
        getRepos().then((repoFiles) => {
            const repoFilesArr = Object.entries(repoFiles).map(
                ([path, content]) => ({
                    path,
                    name: getFileName(path),
                    content,
                })
            );
            setRepoFiles(repoFilesArr);
        });
    }, [projectId]);

    return { repoFiles };
};
