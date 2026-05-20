import { STATUS_CODES } from "../constants/statusCodes.js";

class ApiResponse {
    constructor(statusCode, data, message = "Success", token = null) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < STATUS_CODES.BAD_REQUEST;
        if (token) this.token = token;
    }
}

export { ApiResponse };