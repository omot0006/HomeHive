const authService = require("../services/authService");

const register = async (request, response) => {
  const result = await authService.register(request.body);
  response.status(201).json({ success: true, data: result });
};

const login = async (request, response) => {
  const result = await authService.login(request.body);
  response.status(200).json({ success: true, data: result });
};

const me = (request, response) => {
  response.status(200).json({ success: true, data: { user: request.user } });
};

const updateMe = async (request, response) => {
  const user = await authService.updateProfile(request.user.id, request.body);
  response.status(200).json({ success: true, data: { user } });
};

module.exports = { login, me, register, updateMe };
