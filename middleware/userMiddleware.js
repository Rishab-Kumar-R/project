const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).redirect("/register");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).redirect("/register");
  }
};

module.exports = authenticateUser;
