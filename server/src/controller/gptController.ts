import { Request, Response } from "express";
import { OpenAiService } from "../service/OpenAiSercvice";
import Project from "../models/projectModel";
import GithubService from "../service/GithubService";
import { NextFunction } from "connect";
import { error400, error401, success200 } from "../error/app.error";

const gptService = new OpenAiService();
const githubService = new GithubService();

export const generateReview = async (
    req: Request<{}, {}, {}, { path: string, projectId: string }>,
    res: Response,
    next: NextFunction) => {
    const { path, projectId } = req.query;

    const project = await Project.findById(projectId).populate("users");
    const user: any = project?.users[0];
    const token = user?.githubId?.accessToken;
    const ownerName = project?.repoDetails?.repoOwner;
    const repoName = project?.repoDetails?.repoName;

    if (!token) return next(error401("Unauthorized"));
    if (!ownerName) return next(error401("Unauthorized"));
    if (!repoName) return next(error401("Unauthorized"));

    const fileContent = await githubService.getFiles(token, ownerName, repoName, [path]);

    const prompt = project?.guidlines;
    const review = await gptService.analyzeFile(fileContent[path], prompt);
    // const files = await getFilesAndPaths();


    // const review = await gpt3.generateReview(prompt);
    res.json({ review });
};


