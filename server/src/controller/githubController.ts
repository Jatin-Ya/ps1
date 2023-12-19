import { Request, Response } from "express";
import GithubService from "../service/GithubService";
import { NextFunction } from "connect";
import { error400, error401, success200 } from "../error/app.error";
import { getFilesAndPaths } from "../utils/GithubUtils";
import User from "../models/userModel";
import Project from "../models/projectModel";

const githubService = new GithubService();

export const getDependabotAlerts = async (
  req: Request<{}, {}, {}, { projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.query;
  // const headers = req.headers.authorization;
  // const token = headers?.split(" ")[1];
  const project: any = await Project.findById(projectId).populate("users");
  const user: any = project?.users[0];
  if (!user) return next(error401("Unauthorized"));
  const ownerName = user?.githubId?.userName;
  const repoName = project?.repoName;
  const token = user?.githubId?.accessToken;

  if (!token) return next(error401("Unauthorized"));

  try {
    const alerts = await githubService.getDependabotAlerts(
      token,
      ownerName,
      repoName
    );

    next(success200(alerts));
  } catch (err) {
    next(error400("Could'nt fetch dependabot alerts"));
  }
};

export const getCodeScannerAlerts = async (
  req: Request<{}, {}, {}, { projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.query;
  // const headers = req.headers.authorization;
  // const token = headers?.split(" ")[1];
  const project: any = await Project.findById(projectId).populate("users");
  const user: any = project?.users[0];
  if (!user) return next(error401("Unauthorized"));
  const ownerName = project?.repoDetails?.repoName;
  const repoName = project?.repoDetails.repoName;
  const token = user?.githubId?.accessToken;

  if (!token) return next(error401("Unauthorized"));

  try {
    const alerts = await githubService.getCodeScannerAlerts(
      token,
      ownerName,
      repoName
    );

    next(success200(alerts));
  } catch (err) {
    next(error400("Could'nt fetch code scanner alerts"));
  }
};

export const getFiles = async (
  req: Request<{}, {}, {}, { projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.query;
  const project: any = await Project.findById(projectId).populate("manager");
  if (!project) return next(error401("No such project exists"));
  const user = project?.manager;
  if (!user) return next(error401("Unauthorized"));
  const ownerName = user?.githubId?.userName;
  const repoName = project?.repoDetails.repoName;
  const token = user?.githubId?.accessToken;
  if (!token) return next(error401("Unauthorized"));

  try {
    const files = await getFilesAndPaths(token, ownerName, repoName);
    next(success200(files));
  } catch (err) {
    next(error401("Unauthorized"));
  }
  // if (!token) return next(error401("Unauthorized"));

  // const paths = await githubService.getPathsOfFilesFromBranch(
  //     token,
  //     ownerName,
  //     repoName,
  //     "master"
  // );

  // const files = await githubService.getFiles(
  //     token,
  //     ownerName,
  //     repoName,
  //     paths
  // );
  // next(success200(files));
};

export const getRepos = async (
  req: Request<{}, {}, {}, { email: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.query;
  const user = await User.findOne({ email: email });
  const token = user?.githubId?.accessToken;
  console.log({ email, token });
  if (!token) return next(error401("Unauthorized"));

  try {
    const repos = await githubService.getRepos(token);
    next(success200(repos));
  } catch (err) {
    next(error401("Unauthorized"));
  }
};

export const filePaths = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.query;

  const project: any = await Project.findById(projectId).populate("users");
  if (!project) return next(error401("No such project exists"));

  const user = project?.users[0];
  if (!user) return next(error401("Unauthorized"));

  const ownerName = project?.repoDetails.repoOwner;
  const repoName = project?.repoDetails.repoName;
  const token = user?.githubId?.accessToken;

  if (!token) return next(error401("Unauthorized"));

  const filePaths = await githubService.getPathsOfFilesFromBranch(
    token,
    ownerName,
    repoName,
    "master"
  );

  next(success200(filePaths));
};

export const fileContents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId, filePath } = req.query;

  const project: any = await Project.findById(projectId).populate("Users");
  if (!project) return next(error401("No such project exists"));

  const user = project?.users[0];
  if (!user) return next(error401("Unauthorized"));

  const ownerName = project?.repoDetails.repoOwner;
  const repoName = project?.repoDetails.repoName;
  const token = user?.githubId?.accessToken;

  if (!token) return next(error401("Unauthorized"));

  const fileContents = await githubService.getFiles(
    token,
    ownerName,
    repoName,
    [filePath as string]
  );

  next(success200(fileContents));
};
