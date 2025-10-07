import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized", success: false });
    }

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized", success: false });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Unauthorized", success: false });
  }
};

export default authorize;
