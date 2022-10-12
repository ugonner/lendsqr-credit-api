"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
class ServiceResponse {
    constructor() { }
    static fail(message, data) {
        return { message, status: false, data };
    }
    static success(message, data) {
        return { message, status: true, data };
    }
}
exports.ServiceResponse = ServiceResponse;
