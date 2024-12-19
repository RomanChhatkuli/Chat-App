import generateToken from "../lib/utils.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  let { fullName, email, password } = req.body;
  try {
    console.log(req.body);
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "Fill all the credentials." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data." });
    }
  } catch (e) {
    console.log("Error in signup Controller.", e.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login Controller.", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    // res.cookie("jwt", "", { maxAge: 0 });
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout Controller.", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    let uploadResponse = await cloudinary.uploader.upload(profilePic,{
      folder: 'chatApp' // Specify the folder here
    });
    try {
      let updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
      console.log("Uploaded Image:", updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log("Error in update controller.", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

// To check if a user is authenticated after each refresh
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
