import { User } from "../models/models.js";

export const findUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }

    const user = await User.findOne({
      username: { $regex: `^${username.trim()}$`, $options: "i" },
    }).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("findUserByUsername error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all users for sidebar except logged-in user
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
