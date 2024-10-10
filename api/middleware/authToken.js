import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      return res.status(401).json({
        message: "User not logged in",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }
      req.userId = decoded?.id;

      next();
    });
  } catch (error) {
    console.error("Auth token error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
