import { Request, Response } from "express";
import GithubService from "../service/GithubService";
import { NextFunction } from "connect";
import { error401, success200 } from "../error/app.error";

const githubService = new GithubService();

export const getAllerts = async (
    req: Request<{}, {}, {}, { ownerName: string; repoName: string }>,
    res: Response,
    next: NextFunction
) => {
    const { ownerName, repoName } = req.query;
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1];

    if (!token) return next(error401("Unauthorized"));

    const alerts = await githubService.getVelnerabilities(
        token,
        ownerName,
        repoName
    );

    next(success200(alerts));
};

export const getFiles = async (
    req: Request<{}, {}, {}, { ownerName: string; repoName: string }>,
    res: Response,
    next: NextFunction
) => {
    const { ownerName, repoName } = req.query;
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1];

    if (!token) return next(error401("Unauthorized"));

    const paths = await githubService.getPathsOfFilesFromBranch(
        token,
        ownerName,
        repoName,
        "master"
    );

    const files = await githubService.getFiles(
        token,
        ownerName,
        repoName,
        paths
    );

    next(success200(files));
}
