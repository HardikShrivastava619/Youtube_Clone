import JWT from "jsonwebtoken";


export const requireSignIn = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        console.log('Token is not found');
        return res.status(401).send({
          success: false,
          message: "Authorization token is required",
        })}


      const decode = JWT.verify(token, process.env.JWT_SECRET)
      req.user = decode
      next();

    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(500).send({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };


  