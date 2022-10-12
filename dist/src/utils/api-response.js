"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor() { }
    static fail(message, statusCode, data) {
        return { message, status: false, statusCode, data };
    }
    static success(message, statusCode, data) {
        return { message, status: true, statusCode, data };
    }
}
exports.ApiResponse = ApiResponse;
