"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error500 = exports.error404 = exports.error401 = exports.error400 = exports.success201 = exports.success200 = exports.AppError = exports.HTTP_STATUS_CODE = void 0;
var HTTP_STATUS_CODE;
(function (HTTP_STATUS_CODE) {
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["OK"] = 200] = "OK";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["CREATED"] = 201] = "CREATED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(HTTP_STATUS_CODE || (exports.HTTP_STATUS_CODE = HTTP_STATUS_CODE = {}));
class AppError extends Error {
    constructor(name, message, statusCode, resBody = {}, isOperational = true) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
        this.resBody = resBody;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const success200 = (resBody = {}) => new AppError("OK", "Success", HTTP_STATUS_CODE.OK, resBody);
exports.success200 = success200;
const success201 = (resBody = {}) => new AppError("CREATED", "Success", HTTP_STATUS_CODE.CREATED, resBody);
exports.success201 = success201;
const error400 = (message, resBody = {}) => new AppError("BAD REQUEST", message, HTTP_STATUS_CODE.BAD_REQUEST, resBody);
exports.error400 = error400;
const error401 = (message, resBody = {}) => new AppError("UNAUTHORIZED", message, HTTP_STATUS_CODE.UNAUTHORIZED, resBody);
exports.error401 = error401;
const error404 = (message, resBody = {}) => new AppError("NOT FOUND", message, HTTP_STATUS_CODE.NOT_FOUND, resBody);
exports.error404 = error404;
const error500 = (message, resBody = {}) => new AppError("INTERNAL SERVER", message, HTTP_STATUS_CODE.INTERNAL_SERVER, resBody);
exports.error500 = error500;
