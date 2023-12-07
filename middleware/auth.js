const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      req.body.userId = decoded.userId;
      next();
    });
  };
  module.exports = authMiddleware