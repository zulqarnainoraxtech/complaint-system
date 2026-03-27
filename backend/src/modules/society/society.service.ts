import prisma from "../../prisma/prismaClient";
import { CreateSocietyInput } from "./society.validation";
import { ApiError } from "../../utils/apiResponse";

export class SocietyService {
  async createSociety(input: CreateSocietyInput) {
    const { name, address, city } = input;

    const existingSociety = await prisma.society.findUnique({
      where: { name },
    });

    if (existingSociety) {
      throw new ApiError(400, "Society with this name already exists");
    }

    const society = await prisma.society.create({
      data: { name, address, city },
    });

    return society;
  }

  async getAllSocieties() {
    return prisma.society.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getSocietiesForDropdown() {
    return prisma.society.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  }

  async getSocietyById(id: string) {
    const society = await prisma.society.findUnique({
      where: { id },
      include: {
        departments: true,
        _count: { select: { users: true, complaints: true } },
      },
    });

    if (!society) {
      throw new ApiError(404, "Society not found");
    }

    return society;
  }
}

export const societyService = new SocietyService();
