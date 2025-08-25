import { User } from "../models/models.js";

export const findUserByUsername = async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: "Username required" });

  const user = await User.findOne({ username: username.toLowerCase() });
  res.status(200).json(user);
};
