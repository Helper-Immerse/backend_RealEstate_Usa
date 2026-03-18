const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    console.log("token =>", token);

    // ✅ Remove "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

        console.log("token =>", token);

    const decoded = jwt.verify(token, "helperimmerse");

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: err.message });
  }
};