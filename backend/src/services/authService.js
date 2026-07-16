const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const normalizeEmail = (email) => (typeof email === "string" ? email.trim().toLowerCase() : email);
const sanitizeNickname = (nickname) =>
  (typeof nickname === "string" ? nickname.trim().replace(/\s+/g, " ") : "");

const createAccessToken = (userId) =>
  jwt.sign({}, env.jwtSecret, {
    subject: userId.toString(),
    expiresIn: env.jwtExpiresIn,
  });

const register = async ({ firstName, lastName, nickname = "", email, password }) => {
  const user = await User.create({
    firstName,
    lastName,
    nickname: sanitizeNickname(nickname),
    email: normalizeEmail(email),
    password,
  });

  return { token: createAccessToken(user.id), user };
};

const updateProfile = async (userId, { nickname }) => {
  if (nickname === undefined) throw new AppError("Nickname is required for this update.", 400);

  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found.", 404);

  user.nickname = sanitizeNickname(nickname);
  await user.save();
  return user;
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required.", 400);
  }

  const user = await User.findOne({ email: normalizeEmail(email) }).select("+password");
  const passwordMatches = user ? await user.comparePassword(password) : false;

  if (!user || !passwordMatches) {
    throw new AppError("Invalid email or password.", 401);
  }

  user.password = undefined;
  return { token: createAccessToken(user.id), user };
};

const verifyAccessToken = (token) => jwt.verify(token, env.jwtSecret);

module.exports = { createAccessToken, login, register, updateProfile, verifyAccessToken };
