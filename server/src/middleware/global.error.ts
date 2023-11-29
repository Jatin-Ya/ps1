import { ErrorRequestHandler, NextFunction, Response } from "express";
import { errorHandler } from "../error/handle.error";

export const globalErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    if (!errorHandler.isTrusedError(err)) {
        const resBody = { message: "Unhandled exception" };

        res.status(500).json(resBody);

        return next(err);
    }

    if (!errorHandler.isOk(err)) {
        errorHandler.handleError(err);

        const resBody = { message: err.message };

        return res.status(err.statusCode).json(resBody);
    }

    res.status(200).json({
        ...err.resBody,
    });
};
