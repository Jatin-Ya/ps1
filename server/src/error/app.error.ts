export enum HTTP_STATUS_CODE {
    OK = 200,
    CREATED = 201,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    name: string;
    resBody: any;

    constructor(
        name: string,
        message: string,
        statusCode: HTTP_STATUS_CODE,
        resBody: any = {},
        isOperational: boolean = true
    ) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
        this.resBody = resBody;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const success200 = (resBody: any = {}) =>
    new AppError("OK", "Success", HTTP_STATUS_CODE.OK, resBody);

export const success201 = (resBody: any = {}) =>
    new AppError("CREATED", "Success", HTTP_STATUS_CODE.CREATED, resBody);

export const error400 = (message: string, resBody: any = {}) =>
    new AppError("BAD REQUEST", message, HTTP_STATUS_CODE.BAD_REQUEST, resBody);

export const error401 = (message: string, resBody: any = {}) =>
    new AppError("UNAUTHORIZED", message, HTTP_STATUS_CODE.UNAUTHORIZED, resBody);

export const error404 = (message: string, resBody: any = {}) =>
    new AppError("NOT FOUND", message, HTTP_STATUS_CODE.NOT_FOUND, resBody);

export const error500 = (message: string, resBody: any = {}) =>
    new AppError("INTERNAL SERVER", message, HTTP_STATUS_CODE.INTERNAL_SERVER, resBody);
