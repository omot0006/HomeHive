const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      required: true,
      default: "member",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const hiveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hive name is required."],
      trim: true,
      maxlength: [80, "Hive name cannot exceed 80 characters."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters."],
      default: "",
    },
    householdType: {
      type: String,
      required: [true, "Household type is required."],
      trim: true,
      maxlength: [60, "Household type cannot exceed 60 characters."],
    },
    inviteCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: [/^[A-Z0-9]{6}$/, "Invite code must be 6 uppercase letters or numbers."],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [memberSchema],
      default: [],
    },
  },
  { timestamps: true, toJSON: { versionKey: false } },
);

module.exports = mongoose.model("Hive", hiveSchema);
