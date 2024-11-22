const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const requireAdminAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    console.log("Token:", token); // Log the token
    const decodedToken = jwt.verify(token, jwtSecretKey);
    console.log("Decoded Token:", decodedToken); // Log the decoded token
    if (decodedToken.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Only admins can access this endpoint" });
    }
  } catch (error) {
    console.error("Error verifying token:", error); // Log any errors
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = requireAdminAuth;
