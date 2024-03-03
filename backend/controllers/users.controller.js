import User from "../models/users.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } });
    res.status(201).json(filteredUser);
  } catch (error) {
    console.log("Error in Get Users For Sidebar  Controller", error.message);
    ("");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
