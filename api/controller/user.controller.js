import User from "../models/user.model.js";

// =============== Current User Details ===============
export const userDetailsController = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message: "User ID not found",
        error: true,
        success: false,
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res
      .status(500)
      .json({ message: "Server error, Please try again later", error: true });
  }
};

// =============== All Users ===============
export const AllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      error: false,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error. Unable to fetch users.",
      error: true,
    });
  }
};

// =============== Update User ===============
export const updateUser = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    const { userId, name, email, role } = req.body;

    const sessionUser = await User.findById(sessionUserId);
    if (!sessionUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found.",
      });
    }

    if (sessionUser.role !== "admin" && sessionUserId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not allowed to update this user.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Server error. Could not update user.",
    });
  }
};
