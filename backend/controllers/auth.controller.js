import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generate-token.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please fill in all fields", success: false });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials", success: false });
    }

    generateToken(res, user._id);

    res.status(200).json({
      msg: "User signed in successfully",
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: c, success: false });
  }
};

const signUp = async (req, res) => {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password || !gender) {
    return res
      .status(400)
      .json({ msg: "Please fill in all fields", success: false });
  }

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ msg: "User already exists", success: false });
  }

  if (password.length < 6) {
    return res.status(400).json({
      msg: "Password must be at least 6 characters long",
      success: false,
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 12);

  const avatarBoy = `https://avatar.iran.liara.run/public/boy?username=${email}`;
  const avatarGirl = `https://avatar.iran.liara.run/public/girl?username=${email}`;
  try {
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      gender,
      avatar: gender == "male" ? avatarBoy : avatarGirl,
    });

    await user.save();

    res.status(201).json({
      msg: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

const signOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "User signed out successfully", success: true });
};

const fetchAccount = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "User not found", success: false });
    }

    res.status(200).json({
      msg: "User fetched successfully",
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

export default {
  signIn,
  signUp,
  signOut,
  fetchAccount,
};
