import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //in millisecs
    httpOnly: true, //prevents XSS cross-site scripting attacks
    sameSite: "strict", // prevents CSRF attacks,
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
};
export default generateTokenAndSetCookie;
