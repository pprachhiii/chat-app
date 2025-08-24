// -----------------------
// UPDATE PROFILE
// -----------------------
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, profilePic } = req.body;

    // validation checks
    if (fullName && fullName.trim().length < 3) {
      return res
        .status(400)
        .json({ message: "Full name must be at least 3 characters long." });
    }

    if (bio && bio.length > 200) {
      return res
        .status(400)
        .json({ message: "Bio cannot exceed 200 characters." });
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName.trim();
    if (bio) updateData.bio = bio.trim();

    // profile picture upload
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "chatapp/profile_pics",
        transformation: [
          { width: 300, height: 300, crop: "fill", gravity: "face" },
        ], // optimized
      });

      updateData.profilePic = {
        public_id: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      };
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Response includes "View Profile" link for frontend
    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      viewProfileUrl: `${process.env.CLIENT_URL}/profile/${updatedUser.username}`,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// Get mini-profile of a participant
// -----------------------
export const getUserMiniProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(
      "username fullName profilePic bio status lastSeen"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserMiniProfile: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
