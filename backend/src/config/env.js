const dotenv = require("dotenv");

dotenv.config({ quiet: true });

const parsePort = (value) => {
  const port = Number(value ?? 5000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  return port;
};

const splitOrigins = (value) =>
  (value ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parsePort(process.env.PORT),
  mongoUri: process.env.MONGODB_URI,
  corsOrigins: splitOrigins(process.env.CORS_ORIGIN),
});

const validateEnvironment = () => {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required. Copy .env.example to .env and add your MongoDB Atlas connection string.");
  }
};

module.exports = { env, validateEnvironment };
