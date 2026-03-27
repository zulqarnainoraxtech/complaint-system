import { Request, Response } from "express";
import { authService } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiResponse";

export class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const data = await authService.login(req.body);

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Login successful"));
  });
}

export const authController = new AuthController();
