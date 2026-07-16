const http = require("http");
const app = require("./app");
const { env, validateEnvironment } = require("./config/env");
const { connectDatabase, disconnectDatabase } = require("./config/database");

const server = http.createServer(app);
let isShuttingDown = false;

const shutdown = async (signal, exitCode = 0) => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`${signal} received. Shutting down HomeHive API...`);

  server.close(async () => {
    try {
      await disconnectDatabase();
      process.exit(exitCode);
    } catch (error) {
      console.error("Graceful shutdown failed:", error);
      process.exit(1);
    }
  });

  setTimeout(() => process.exit(1), 10000).unref();
};

const startServer = async () => {
  try {
    validateEnvironment();
    await connectDatabase();

    server.listen(env.port, () => {
      console.log(`HomeHive API running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error("HomeHive API failed to start:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
  shutdown("unhandledRejection", 1);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  shutdown("uncaughtException", 1);
});

startServer();

module.exports = { server, startServer };
