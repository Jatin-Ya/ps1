"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const handle_error_1 = require("../error/handle.error");
const globalErrorHandler = (err, req, res, next) => {
    if (!handle_error_1.errorHandler.isTrusedError(err)) {
        const resBody = { message: "Unhandled exception" };
        res.status(500).json(resBody);
        return next(err);
    }
    if (!handle_error_1.errorHandler.isOk(err)) {
        handle_error_1.errorHandler.handleError(err);
        const resBody = { message: err.message };
        return res.status(err.statusCode).json(resBody);
    }
    res.status(200).json(Object.assign({}, err.resBody));
};
exports.globalErrorHandler = globalErrorHandler;
