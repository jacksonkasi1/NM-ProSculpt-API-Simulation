import { z } from "zod";

// Define the schema for query parameters
export const CoursesQuerySchema = z.object({
  course_unique_code: z.string().optional(),
  is_active: z.boolean().optional(),
  approval_status: z.boolean().optional(),
});

export type CoursesQuery = z.infer<typeof CoursesQuerySchema>;
