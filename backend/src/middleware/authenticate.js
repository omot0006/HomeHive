const User = require("../models/User");
const authService = require("../services/authService");
const AppError = require("../utils/AppError");

const authenticate = async (request, _response, next) => {
  const authorization = request.get("Authorization");

  if (!authorization?.startsWith("Bearer ")) {
    throw new AppError("Authentication token is required.", 401);
  }

  const token = authorization.slice(7).trim();
  if (!token) throw new AppError("Authentication token is required.", 401);

  try {
    const payload = authService.verifyAccessToken(token);
    const user = await User.findById(payload.sub);

    if (!user) throw new AppError("The user for this token no longer exists.", 401);

    request.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name === "TokenExpiredError") throw new AppError("Authentication token has expired.", 401);
    throw new AppError("Authentication token is invalid.", 401);
  }
};

module.exports = authenticate;

