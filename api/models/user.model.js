import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String },
    role: { type: String, enum: ["ADMIN", "GENERAL"], default: "GENERAL" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
