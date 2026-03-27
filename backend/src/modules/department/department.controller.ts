import { Request, Response } from "express";
import { departmentService } from "./department.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/apiResponse";

export class DepartmentController {
  createDepartment = asyncHandler(async (req: Request, res: Response) => {
    const department = await departmentService.createDepartment(req.body);

    return res
      .status(201)
      .json(new ApiResponse(201, department, "Department created successfully"));
  });

  getAllDepartments = asyncHandler(async (req: Request, res: Response) => {
    const departments = await departmentService.getAllDepartments();

    return res
      .status(200)
      .json(new ApiResponse(200, departments, "Departments fetched successfully"));
  });
}

export const departmentController = new DepartmentController();
