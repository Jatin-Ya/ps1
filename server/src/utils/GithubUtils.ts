import GithubService from "../service/GithubService";

const githubService = new GithubService();

export const getFilesAndPaths = async (
  token: string | undefined,
  ownerName: string | string[] | undefined,
  repoName: string | string[] | undefined
) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const paths = await githubService.getPathsOfFilesFromBranch(
    token,
    ownerName as string,
    repoName as string,
    "master"
  );

  const files = await githubService.getFiles(
    token,
    ownerName as string,
    repoName as string,
    paths
  );

  return files;
};
