const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    (req.userId = decoded._id), (req.role = decoded.role);
    next();
  });
};
