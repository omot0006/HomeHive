const mongoose = require("mongoose");

const connectionStates = ["disconnected", "connected", "connecting", "disconnecting"];

const getHealth = () => ({
  status: "ok",
  service: "homehive-api",
  uptime: Math.round(process.uptime()),
  timestamp: new Date().toISOString(),
  database: {
    status: connectionStates[mongoose.connection.readyState] ?? "unknown",
  },
});

module.exports = { getHealth };

