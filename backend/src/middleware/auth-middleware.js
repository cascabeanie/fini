import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ errorMessage: "No token provided to server." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ errorMessage: "Token is invalid." });
    }

    req.userId = decoded.id;
    next();
  });
}
