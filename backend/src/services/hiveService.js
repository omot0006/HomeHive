const crypto = require("node:crypto");
const mongoose = require("mongoose");
const Hive = require("../models/Hive");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const INVITE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const userFields = "firstName lastName nickname avatar role";

const generateInviteCode = () =>
  Array.from({ length: 6 }, () => INVITE_ALPHABET[crypto.randomInt(INVITE_ALPHABET.length)]).join("");

const generateUniqueInviteCode = async () => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = generateInviteCode();
    if (!(await Hive.exists({ inviteCode: code }))) return code;
  }
  throw new AppError("Unable to generate an invite code. Please try again.", 503);
};

const populateHive = (hive) => hive.populate([
  { path: "owner", select: userFields },
  { path: "members.user", select: userFields },
]);

const createHive = async (userId, { name, description = "", householdType }) => {
  const inviteCode = await generateUniqueInviteCode();
  const session = await mongoose.startSession();
  let createdHive;

  try {
    await session.withTransaction(async () => {
      const user = await User.findById(userId).session(session);
      if (!user) throw new AppError("User not found.", 404);
      if (user.hiveId) throw new AppError("You already belong to a Hive.", 409);

      [createdHive] = await Hive.create([{
        name,
        description: typeof description === "string" ? description.trim() : "",
        householdType,
        inviteCode,
        owner: user._id,
        members: [{ user: user._id, role: "owner" }],
      }], { session });

      user.hiveId = createdHive._id;
      await user.save({ session });
    });
  } finally {
    await session.endSession();
  }

  return populateHive(createdHive);
};

const getMyHive = async (userId) => {
  const user = await User.findById(userId);
  if (!user?.hiveId) throw new AppError("You do not belong to a Hive yet.", 404);

  const hive = await Hive.findById(user.hiveId);
  if (!hive) throw new AppError("Your Hive could not be found.", 404);
  return populateHive(hive);
};

const joinHive = async (userId, { inviteCode }) => {
  const normalizedCode = typeof inviteCode === "string" ? inviteCode.trim().toUpperCase() : "";
  if (!/^[A-Z0-9]{6}$/.test(normalizedCode)) {
    throw new AppError("Enter a valid 6-character invite code.", 400, { inviteCode: "Enter a valid 6-character invite code." });
  }

  const session = await mongoose.startSession();
  let joinedHive;

  try {
    await session.withTransaction(async () => {
      const user = await User.findById(userId).session(session);
      if (!user) throw new AppError("User not found.", 404);

      joinedHive = await Hive.findOne({ inviteCode: normalizedCode }).session(session);
      if (!joinedHive) throw new AppError("No Hive was found with that invite code.", 404);
      if (user.hiveId || joinedHive.members.some((member) => member.user.equals(user._id))) {
        throw new AppError("You already belong to a Hive.", 409);
      }

      joinedHive.members.push({ user: user._id, role: "member" });
      await joinedHive.save({ session });
      user.hiveId = joinedHive._id;
      await user.save({ session });
    });
  } finally {
    await session.endSession();
  }

  return populateHive(joinedHive);
};

module.exports = { createHive, getMyHive, joinHive };
