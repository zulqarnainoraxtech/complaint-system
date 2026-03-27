import { z } from "zod";

export const createDepartmentSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Department name is required" }).min(2, "Department name must be at least 2 characters"),
    societyId: z.string().optional(),
  }),
});

export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>["body"];
