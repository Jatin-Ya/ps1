"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENAI_API_KEY = exports.MONGO_CONNECTION_STRING = exports.CORS_ORIGIN = exports.PORT = void 0;
exports.PORT = process.env.PORT || 8080;
exports.CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
exports.MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "";
exports.OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
