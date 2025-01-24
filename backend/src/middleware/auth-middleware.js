import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided to client" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token is invalid" });
    }

    req.userId = decoded.id;
    next();
  });
}
