import { z } from "zod";

// Define the schema using zod
export const ProgressSchema = z.object({
  user_id: z.string().min(1, { message: "user_id is required" }),
  course_id: z.string().min(1, { message: "course_id is required" }),
});

export type ProgressRequest = z.infer<typeof ProgressSchema>;
