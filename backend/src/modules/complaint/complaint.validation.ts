import { z } from "zod";

export const createComplaintSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).min(3, "Title must be at least 3 characters"),
    description: z.string({ required_error: "Description is required" }).min(10, "Description must be at least 10 characters"),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    departmentId: z.string().optional(),
    societyId: z.string().optional(),
  }),
});

export type CreateComplaintInput = z.infer<typeof createComplaintSchema>["body"];
