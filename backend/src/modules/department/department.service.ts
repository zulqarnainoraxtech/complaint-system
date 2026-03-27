import prisma from "../../prisma/prismaClient";
import { CreateDepartmentInput } from "./department.validation";

export class DepartmentService {
  async createDepartment(input: CreateDepartmentInput) {
    const { name, societyId } = input;

    const department = await prisma.department.create({
      data: {
        name,
        societyId,
      },
    });

    return department;
  }

  async getAllDepartments() {
    return prisma.department.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}

export const departmentService = new DepartmentService();
