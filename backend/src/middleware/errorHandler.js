const { env } = require("../config/env");

const errorHandler = (error, _request, response, _next) => {
  const statusCode = error.statusCode ?? 500;
  const isProduction = env.nodeEnv === "production";

  if (statusCode >= 500) {
    console.error(error);
  }

  const payload = {
    success: false,
    error: {
      message: isProduction && !error.isOperational ? "Internal server error." : error.message,
      ...(error.details ? { details: error.details } : {}),
      ...(!isProduction ? { stack: error.stack } : {}),
    },
  };

  response.status(statusCode).json(payload);
};

module.exports = errorHandler;

