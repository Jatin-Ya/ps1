import { Request, Response } from "express";
import GithubVulnarabilityService from "../service/GithubVulnarabilityService";
import { NextFunction } from "connect";
import { error400, error401, success200 } from "../error/app.error";

const vulnarabilityService = new GithubVulnarabilityService();

export const getDependabotAlerts = async (
    req: Request<{}, {}, {}, { ownerName: string; repoName: string }>,
    res: Response,
    next: NextFunction
) => {
    const { ownerName, repoName } = req.query;
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1];

    if (!token) return next(error401("Unauthorized"));

    try {
        const alerts = await vulnarabilityService.getDependabotAlerts(
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
    req: Request<{}, {}, {}, { ownerName: string; repoName: string }>,
    res: Response,
    next: NextFunction
) => {
    const { ownerName, repoName } = req.query;
    const headers = req.headers.authorization;
    const token = headers?.split(" ")[1];

    if (!token) return next(error401("Unauthorized"));

    try {
        const alerts = await vulnarabilityService.getCodeScannerAlerts(
            token,
            ownerName,
            repoName
        );

        next(success200(alerts));
    } catch (err) {
        next(error400("Could'nt fetch code scanner alerts"));
    }
};
