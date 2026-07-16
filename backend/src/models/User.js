const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      maxlength: [80, "First name cannot exceed 80 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      maxlength: [80, "Last name cannot exceed 80 characters."],
    },
    nickname: {
      type: String,
      trim: true,
      maxlength: [40, "Nickname cannot exceed 40 characters."],
      default: "",
      validate: {
        validator: (value) => /^[\p{L}\s'’-]*$/u.test(value),
        message: "Nickname may only contain letters, spaces, hyphens, and apostrophes.",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => emailPattern.test(value),
        message: "Enter a valid email address.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters."],
      select: false,
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
    hiveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hive",
      default: null,
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(_document, result) {
        delete result.password;
        return result;
      },
    },
  },
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
