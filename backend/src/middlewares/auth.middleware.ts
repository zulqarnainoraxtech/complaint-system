import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ApiError(401, "Not authorized, no token"));
    }

    try {
      const secret = process.env.JWT_SECRET || "mt-secret-key";
      const decoded = jwt.verify(token, secret) as {
        id: string;
        email: string;
        role: string;
      };

      console.log("decoded user is ", decoded)

      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return next(new ApiError(401, "Not authorized, token failed"));
    }
  }
);
