export const RESPONSE_MESSAGES = {
    // 2xx Success
    SUCCESS: "Request successful.",
    CREATED: "Resource created successfully.",
    ACCEPTED: "Request accepted but not yet processed.",
    NO_CONTENT: "No content available.",

    // 3xx Redirection
    MOVED_PERMANENTLY: "The resource has been moved permanently.",
    FOUND: "The resource has been found at a different location.",
    NOT_MODIFIED: "The resource has not been modified since the last request.",

    // 4xx Client Errors
    BAD_REQUEST: "Invalid request parameters.",
    UNAUTHORIZED: "Authentication required.",
    PAYMENT_REQUIRED: "Payment is required to access this resource.",
    FORBIDDEN: "You do not have permission to access this resource.",
    NOT_FOUND: "Resource not found.",
    METHOD_NOT_ALLOWED: "The request method is not allowed on this resource.",
    NOT_ACCEPTABLE: "The requested resource cannot generate content acceptable to the client.",
    REQUEST_TIMEOUT: "The request timed out.",
    CONFLICT: "Conflict occurred with existing data.",
    GONE: "The resource is no longer available.",
    PAYLOAD_TOO_LARGE: "The request payload is too large.",
    UNSUPPORTED_MEDIA_TYPE: "The media format is not supported.",
    TOO_MANY_REQUESTS: "Too many requests. Please try again later.",

    // 5xx Server Errors
    INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
    NOT_IMPLEMENTED: "The server does not support the requested functionality.",
    BAD_GATEWAY: "Invalid response from the upstream server.",
    SERVICE_UNAVAILABLE: "The server is temporarily unavailable.",
    GATEWAY_TIMEOUT: "The server took too long to respond.",

    // Custom Messages
    USER_NOT_FOUND: "User not found in the system.",
    USER_CREATED: "User account created successfully.",
    LOGIN_SUCCESS: "Login successful.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    TOKEN_EXPIRED: "Session expired. Please log in again.",
    EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
    PASSWORD_RESET_SUCCESS: "Password reset successful.",
    PASSWORD_RESET_FAILED: "Password reset failed. Please try again.",

    EMAIL_VERIFICATION: "A verification link has been sent to your email to verify your account.",
    EMAIL_VERIFICATION_SENT: "Email verification link sent successfully.",
    EMAIL_VERIFIED_SUCCESS: "Email verified successfully.",
    EMAIL_VERIFICATION_FAILED: "Invalid or expired email verification token.",
    ACCOUNT_NOT_VERIFIED: "Please verify your account before logging in.",
    LOGOUT_SUCCESS: "Logged out successfully.",
    INVALID_REFRESH_TOKEN: "Invalid refresh token.",
    REFRESH_TOKEN_SUCCESS: "Access token refreshed successfully.",
    ERROR_SENDING_EMAIL: "Service unavailable: Failed to send email.",

    TEMPLATE_NOT_FOUND: "Email template file not found.",
    TEMPLATE_READ_ERROR: "Error reading the email template file.",
    TEMPLATE_REPLACE_ERROR: "Error replacing placeholders in the email template.",
    ALL_FIELDS_REQUIRED: "All fields are required to complete this request.",

    // New Messages for User Management
    CURRENT_USER_FETCH_SUCCESS: "Current user information retrieved successfully.",
    PROFILE_UPDATE_SUCCESS: "Account details updated successfully.",
    PROFILE_UPDATE_FAILED: "Failed to update account details.",
    AVATAR_UPDATE_SUCCESS: "Avatar image updated successfully.",
    AVATAR_UPDATE_FAILED: "Failed to update avatar image.",
    AVATAR_FILE_MISSING: "Avatar file is missing. Please upload a valid file.",
    AVATAR_UPLOAD_ERROR: "Error occurred while uploading avatar image.",

    // New Messages for Question Management
    CSV_FILE_MISSING: "CSV file is missing.",
    NO_QUESTIONS_FOUND: "No questions found in the CSV file.",
    BULK_IMPORT_SUCCESS: "Bulk questions imported successfully.",
    ERROR_SAVING_QUESTIONS: "Error while saving questions or categories.",
    QUESTIONS_FETCH_SUCCESS: "Questions fetched successfully.",
    NO_CATEGORIES_FOUND: "No categories found or no questions for the specified category.",
    ANSWER_SUBMISSION_SUCCESS: "Answer submitted successfully.",
    QUESTION_NOT_FOUND: "Question not found.",
    ERROR_SUBMITTING_ANSWER: "Error while submitting answer.",
    SEARCH_QUERY_REQUIRED: "Search query is required.",
    NO_ANSWERS_FOUND: "No answers found for the search query.",
    ANSWERS_FETCH_SUCCESS: "Answers and corresponding questions fetched successfully.",

    // Category Management Messages
    CATEGORIES_FETCH_SUCCESS: "Categories fetched successfully.",
    CATEGORIES_WITH_QUESTION_COUNT_SUCCESS: "Categories fetched successfully with question count.",
    NO_CATEGORIES_FOUND: "No categories found.",
    ERROR_FETCHING_CATEGORIES: "Error while fetching categories.",
    ERROR_FETCHING_CATEGORIES_WITH_COUNT: "Error while fetching categories with question count."
};