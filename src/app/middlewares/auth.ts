import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/Users/user.interface";
import { AppError } from "../Errors/AppError";

export const auth = (...requiredRole: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7); // Remove 'Bearer ' from the token
      jwt.verify(token, config.jwt_token_access as string, (err, decoded) => {
        const role = (decoded as JwtPayload).role;
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        } else if (requiredRole && !requiredRole.includes(role)) {
          return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "You have no access to this route",
          });
        } else {
          req.user = decoded as JwtPayload;
          next();
        }
      });
    } else {
      res.status(403).json({
        message: "No token provided",
      });
    }
  };
};
