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
        // const DummyResponse: RepoResponse = {
        //     "src/index.js": `console.log("Hello World");`
        // ,
        //     "src/index.html": "<h1>Hello World</h1>",
        // };
        // return DummyResponse;

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

/*
    `#include <stdio.h>\n\n
    int main() {\n
      // Example 1: Loop through an array and log the value of each element\n");
      const numbers = [1, 2, 3, 4, 5];\n
      numbers.forEach(function(number) {\n
        console.log(number);\n");
      });\n\n

      // Example 2: Loop through an array of objects and log a property of each object\n");
      const students = [\n
        { name: 'Alice', grade: 'A' },\n
        { name: 'Bob', grade: 'B' },\n
        { name: 'Charlie', grade: 'C' },\n
      ];\n");
      students.forEach(function(student) {\n
        console.log(student.name);\n
      });\n\n

      // Example 3: Loop through the characters of a string and log each character\n
      const sentence = 'SheCodes is awesome!';\n
      const characters = sentence.split(''); // Use the split() function to turn the string into an array\n
      characters.forEach(function(character) {\n
        console.log(character);\n
      });\n"

      return 0;\n
    }\n"
*/
