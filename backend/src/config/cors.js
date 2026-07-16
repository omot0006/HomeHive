const { env } = require("./env");
const AppError = require("../utils/AppError");

const corsOptions = {
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  origin(origin, callback) {
    if (!origin || env.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new AppError(`Origin ${origin} is not allowed by CORS.`, 403));
  },
};

module.exports = corsOptions;
