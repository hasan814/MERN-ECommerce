import User from "../models/user.model.js";

export const uploadProductPermission = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role === "ADMIN") return true;
  return false;
};
