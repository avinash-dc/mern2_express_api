const jwt = require("jsonwebtoken");
const AuthSchema = require("../models/Auth");
const { JWT_SECRET } = require("../config/index");

exports.protected = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      res
        .status(401)
        .json({ message: "INVALID token or you are not authorized" })
    );
  }

  //verify encoded token
  try {
    let decoded = jwt.verify(token, JWT_SECRET);
      req.user = await AuthSchema.findById(decoded.id);
      next();
  } catch (err) {
    return next(
      res
        .status(401)
        .json({ message: "Invalid token or you are not authorized" })
    );
  }
};
