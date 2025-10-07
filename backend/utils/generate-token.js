import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  let optionsCookies = {
    httpOnly: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    ...(process.env.NODE_ENV === "production" && {
      sameSite: "none", // CSRF protection
      secure: true,
    }),
  };

  res.cookie("token", token, optionsCookies); // 7 days in milliseconds
};

export default generateToken;
