import { AppError } from "./app.error";

class ErrorHandler {
    public handleError(error: Error) {
        console.log("error from handle error");
        console.error(error);
    }

    public isOk(error: AppError) {
        return error.statusCode.toString().startsWith("2");
    }

    public isTrusedError(error: Error) {
        if (error instanceof AppError) return error.isOperational;
        return false;
    }
}

export const errorHandler = new ErrorHandler();
