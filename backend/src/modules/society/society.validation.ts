import { z } from "zod";

export const createSocietySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Society name is required" }).min(2, "Society name must be at least 2 characters"),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});

export type CreateSocietyInput = z.infer<typeof createSocietySchema>["body"];
