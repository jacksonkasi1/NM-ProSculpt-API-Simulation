import { z } from "zod";

// Define the schema using zod
export const PublishSchema = z.object({
  course_unique_code: z.string().min(1, { message: "course_unique_code is required" }),
  course_name: z.string().min(1, { message: "course_name is required" }),
  course_description: z.string().min(1, { message: "course_description is required" }),
  course_image_url: z.string().url({ message: "course_image_url must be a valid URL" }),
  instructor: z.string().min(1, { message: "instructor is required" }),
  duration: z.number().min(1, { message: "duration is required" }),
  number_of_videos: z.number().optional(),
  language: z.string().min(1, { message: "language is required" }),
  main_stream: z.string().min(1, { message: "main_stream is required" }),
  sub_stream: z.string().min(1, { message: "sub_stream is required" }),
  category: z.string().min(1, { message: "category is required" }),
  system_requirements: z.string().min(1, { message: "system_requirements is required" }),
  has_subtitles: z.boolean().optional(),
  reference_id: z.string().optional(),
  course_type: z.enum(["ONLINE", "CLASSROOM"]),
  location: z.string().optional(),
  course_content: z.array(z.object({
    content: z.string().min(1, { message: "content is required" })
  })),
  course_objective: z.array(z.object({
    objective: z.string().min(1, { message: "objective is required" })
  }))
});

export type PublishRequest = z.infer<typeof PublishSchema>;
