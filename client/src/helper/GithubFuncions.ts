import axios from "axios";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import React from "react";

export type RepoFile = {
  path: string;
  name: string;
  content: string;
};

type RepoResponse = Record<string, string>;

export const getFileName = (path: string) => path.split("/").pop() || "";

export const getFileContents = async (projectId: string, filePath: string) => {
  const baseUrl = getBackendBaseUrl();

  const query = new URLSearchParams({
    projectId,
    filePath,
  });

  const response = await axios.get<RepoResponse>(
    `${baseUrl}/github/fileContents?${query}`
  );

  const path = Object.keys(response.data)[0];
  const name = getFileName(path);
  const content = response.data[path];

  const repoFile: RepoFile = {
    path,
    name,
    content,
  };

  return repoFile;
};

// export const formatContent: React.FC = (content: string) => {
//   const lines = content.split("\n");
//   const formattedLines = lines.map((line) => line.trim());

//   const components = formattedLines.map((line, index) => {
//     const key = `${line}-${index}`;
//     return <p key={key}>{line}</p>;
//   });

//   return <>{components}</>;
// };
