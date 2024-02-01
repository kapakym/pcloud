"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, detail) {
        super();
        this.status = status;
        this.message = message;
        this.detail = detail;
    }
    static badRequest(message) {
        return new ApiError(404, message);
    }
    static errorRequest(message, detail) {
        return new ApiError(400, message, detail);
    }
    static internal(message) {
        return new ApiError(500, message);
    }
    static forbidden(message) {
        return new ApiError(403, message);
    }
}
exports.ApiError = ApiError;
module.exports = ApiError;
