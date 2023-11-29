import { Request, Response } from "express";
import GithubVulnarabilityService from "../service/GithubVulnarabilityService";
import { NextFunction } from "connect";
import { error401, success200 } from "../error/app.error";

const vulnarabilityService = new GithubVulnarabilityService();

export const getAllerts = async (
    req: Request<{}, {}, {}, { ownerName: string; repoName: string }>,
    res: Response,
    next: NextFunction
) => {
    const { ownerName, repoName } = req.query;
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1];

    if (!token) return next(error401("Unauthorized"));

    const alerts = await vulnarabilityService.getVelnerabilities(
        token,
        ownerName,
        repoName
    );

    next(success200(alerts));
};
