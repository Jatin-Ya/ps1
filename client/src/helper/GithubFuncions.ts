import axios from "axios";
import { getBackendBaseUrl } from "../utils/backendFunctions";

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

  const response = await axios.get<RepoResponse>(`${baseUrl}/github/fileContents?${query}`);

  const repoFile: RepoFile = {
    path: response.data.keys[0],
    name: getFileName(response.data.keys[0]),
    content: response.data[response.data.keys[0]],
  };

  return repoFile;
};
