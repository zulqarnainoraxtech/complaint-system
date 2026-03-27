import { Request, Response } from "express";
import { societyService } from "./society.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiResponse";

export class SocietyController {
  createSociety = asyncHandler(async (req: Request, res: Response) => {
    const society = await societyService.createSociety(req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, society, "Society created successfully"));
  });

  getAllSocieties = asyncHandler(async (req: Request, res: Response) => {
    const societies = await societyService.getAllSocieties();

    return res
      .status(200)
      .json(new ApiResponse(200, societies, "Societies fetched successfully"));
  });

  getSocietiesForDropdown = asyncHandler(async (req: Request, res: Response) => {
    const societies = await societyService.getSocietiesForDropdown();

    return res
      .status(200)
      .json(new ApiResponse(200, societies, "Societies for dropdown fetched successfully"));
  });

  getSocietyById = asyncHandler(async (req: Request, res: Response) => {
    const society = await societyService.getSocietyById(req.params.id as string);

    return res
      .status(200)
      .json(new ApiResponse(200, society, "Society fetched successfully"));
  });
}

export const societyController = new SocietyController();
