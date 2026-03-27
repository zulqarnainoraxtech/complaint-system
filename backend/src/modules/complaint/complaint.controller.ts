import { Response } from "express";
import { complaintService } from "./complaint.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiResponse";
import { AuthRequest } from "../../middlewares/auth.middleware";

export class ComplaintController {
  createComplaint = asyncHandler(async (req: AuthRequest, res: Response) => {
    // req.user is guaranteed to be set by the auth middleware
    const userId = req.user!.id;
    const complaint = await complaintService.createComplaint(userId, req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, complaint, "Complaint created successfully"));
  });

  getMyComplaints = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const complaints = await complaintService.getMyComplaints(userId);

    return res
      .status(200)
      .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
  });
}

export const complaintController = new ComplaintController();
