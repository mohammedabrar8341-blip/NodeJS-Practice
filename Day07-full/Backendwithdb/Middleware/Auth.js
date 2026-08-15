const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    const headerToken = req.headers.token;
    const bearerToken = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const token = headerToken || bearerToken;

    if (!token) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};
module.exports = authMiddleware;
