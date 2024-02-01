export class ApiError extends Error {
    status: number;
    message: string;
    detail?: string

    constructor(status: number, message: string, detail?: string) {
        super()
        this.status = status
        this.message = message
        this.detail = detail
    }

    static badRequest(message: string) {
        return new ApiError(404, message)
    }

    static errorRequest(message: string, detail?: string) {
        return new ApiError(400, message, detail)
    }

    static internal(message: string) {
        return new ApiError(500, message)
    }

    static forbidden(message: string) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError