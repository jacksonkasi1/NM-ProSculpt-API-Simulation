import { z } from "zod";

// Define the schema using zod
export const ProgressUpdateSchema = z.object({
  user_unique_id: z.string().min(1, { message: "user_unique_id is required" }).optional(),
  course_unique_code: z.string().min(1, { message: "course_unique_code is required" }).optional(),
  progress_percentage: z.number().min(0).max(100).optional(),
  certificate_issued: z.boolean().optional(),
  certificate_issued_at: z.string().optional(), // Ideally, validate date format
  assessment_status: z.boolean().optional(),
  course_complete: z.boolean().optional(),
});

export type ProgressUpdateRequest = z.infer<typeof ProgressUpdateSchema>;
