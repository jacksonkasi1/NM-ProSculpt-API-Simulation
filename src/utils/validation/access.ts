import { z } from "zod";

// Define the schema using zod
export const AccessSchema = z.object({
  user_id: z.string().min(1, { message: "user_id is required" }),
  course_id: z.string().min(1, { message: "course_id is required" }),
  student_name: z.string().optional(),
  college_code: z.string().optional(),
  college_name: z.string().optional(),
  branch_name: z.string().optional(),
  district: z.string().optional(),
  university: z.string().optional(),
});

export type AccessRequest = z.infer<typeof AccessSchema>;
