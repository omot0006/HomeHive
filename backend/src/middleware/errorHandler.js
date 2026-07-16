const { env } = require("../config/env");

const errorHandler = (error, _request, response, _next) => {
  let normalizedError = error;

  if (error?.code === 11000) {
    const isInviteCode = Boolean(error.keyPattern?.inviteCode);
    normalizedError = {
      message: isInviteCode ? "That invite code is already in use. Please try again." : "An account with this email already exists.",
      statusCode: 409,
      isOperational: true,
      details: { field: isInviteCode ? "inviteCode" : "email" },
    };
  } else if (error?.name === "ValidationError") {
    normalizedError = {
      message: "Please correct the validation errors.",
      statusCode: 400,
      isOperational: true,
      details: Object.fromEntries(
        Object.entries(error.errors).map(([field, validationError]) => [field, validationError.message]),
      ),
    };
  } else if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    normalizedError = {
      message: "Request body contains invalid JSON.",
      statusCode: 400,
      isOperational: true,
    };
  }

  const statusCode = normalizedError.statusCode ?? 500;
  const isProduction = env.nodeEnv === "production";

  if (statusCode >= 500) {
    console.error(normalizedError);
  }

  const payload = {
    success: false,
    error: {
      message: isProduction && !normalizedError.isOperational ? "Internal server error." : normalizedError.message,
      ...(normalizedError.details ? { details: normalizedError.details } : {}),
      ...(!isProduction && normalizedError.stack ? { stack: normalizedError.stack } : {}),
    },
  };

  response.status(statusCode).json(payload);
};

module.exports = errorHandler;
