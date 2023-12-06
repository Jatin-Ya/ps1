import { useEffect, useState } from "react";

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
        return {
            "file1.txt": "content1",
            "file2.txt": "content2",
            "file3.txt": "content3",
            "file4.txt": "content4",
            "file5.txt": "content5",
        };
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
