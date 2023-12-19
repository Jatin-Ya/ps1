import { Request, Response } from "express";
import { OpenAiService } from "../service/OpenAiSercvice";
import Project from "../models/projectModel";
import GithubService from "../service/GithubService";
import { NextFunction } from "connect";
import { error400, error401, success200 } from "../error/app.error";
import User from "../models/userModel";

const gptService = new OpenAiService();
const githubService = new GithubService();

export const generateReview = async (
  req: Request<{}, {}, {}, { path: string; projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { path, projectId } = req.query;

  const project = await Project.findById(projectId).populate("users");
  const user: any = project?.users[0];
  const token = user?.githubId?.accessToken;
  const ownerName = project?.repoDetails?.repoOwner;
  const repoName = project?.repoDetails?.repoName;

  if (!token) return next(error401("Unauthorized"));
  if (!ownerName) return next(error401("Unauthorized"));
  if (!repoName) return next(error401("Unauthorized"));

  try {
    const fileContent = await githubService.getFiles(
      token,
      ownerName,
      repoName,
      [path]
    );
    const prompt = project?.guidlines;
    const review = await gptService.analyzeFile(fileContent[path], prompt);
    res.json({ review });
  } catch (err) {
    next(err);
  }
  // const files = await getFilesAndPaths();

  // const review = await gpt3.generateReview(prompt);
};

export const getRoadmap = async (
  req: Request<{}, {}, {}, { projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.query;

  const project = await Project.findById(projectId);
  if (!project) return next(error400("Project not found"));
  if (!project.aiSupport)
    return next(error400("AI support not enabled for this project"));

  if (!project) return next(error400("Project not found"));

  const guidlines = project?.guidlines || "";
  const description = project?.description || "";
  const title = project?.title || "";

  try {
    if (project.roadmap?.length === 0) {
      const roadmap = await gptService.generateRoadmap(
        guidlines,
        description,
        title
      );
      project.roadmap = roadmap;
      const m = roadmap.map((milestone) => ({
        status: "PENDING",
      }));
    //   project.milestones = m;
      await project.save();
    }
    res.json({ roadmap: project.roadmap });
  } catch (err) {
    next(err);
  }
};

export const query = async (
  req: Request<{}, {}, { query: string; path: string; projectId: string }, {}>,
  res: Response,
  next: NextFunction
) => {
  const { query, path, projectId } = req.body;

  try {
    const project = await Project.findById(projectId).populate("users");
    const user: any = project?.users[0];
    const token = user?.githubId?.accessToken;
    const ownerName = user?.githubId?.name;
    const repoName = project?.repoDetails?.repoName;

    if (!token) return next(error401("Unauthorized"));
    if (!ownerName) return next(error401("Unauthorized"));
    if (!repoName) return next(error401("Unauthorized"));

    const file = await githubService.getFiles(token, ownerName, repoName, [
      path,
    ]);
    const response = await gptService.query(query, file[path]);
    res.json({ response });
  } catch (err) {
    next(err);
  }
};
