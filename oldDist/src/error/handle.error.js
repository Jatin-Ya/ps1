"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const app_error_1 = require("./app.error");
class ErrorHandler {
    handleError(error) {
        console.log("error from handle error");
        console.error(error);
    }
    isOk(error) {
        return error.statusCode.toString().startsWith("2");
    }
    isTrusedError(error) {
        if (error instanceof app_error_1.AppError)
            return error.isOperational;
        return false;
    }
}
exports.errorHandler = new ErrorHandler();
