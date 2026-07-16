const User = require("../models/User");
const hiveService = require("../services/hiveService");

const createHive = async (request, response) => {
  const hive = await hiveService.createHive(request.user.id, request.body);
  const user = await User.findById(request.user.id);
  response.status(201).json({ success: true, data: { hive, user } });
};

const getMyHive = async (request, response) => {
  const hive = await hiveService.getMyHive(request.user.id);
  response.status(200).json({ success: true, data: { hive } });
};

const joinHive = async (request, response) => {
  const hive = await hiveService.joinHive(request.user.id, request.body);
  const user = await User.findById(request.user.id);
  response.status(200).json({ success: true, data: { hive, user } });
};

module.exports = { createHive, getMyHive, joinHive };
