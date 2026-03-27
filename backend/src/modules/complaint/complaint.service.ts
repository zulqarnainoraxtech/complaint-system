import prisma from "../../prisma/prismaClient";
import { CreateComplaintInput } from "./complaint.validation";

export class ComplaintService {
  async createComplaint(userId: string, input: CreateComplaintInput) {
    const { title, description, priority, departmentId, societyId } = input;

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        priority: priority || "medium",
        userId,
        departmentId,
        societyId,
      },
    });

    return complaint;
  }

  async getMyComplaints(userId: string) {
    const complaints = await prisma.complaint.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        department: {
          select: { name: true }
        },
      }
    });
    return complaints;
  }
}

export const complaintService = new ComplaintService();
