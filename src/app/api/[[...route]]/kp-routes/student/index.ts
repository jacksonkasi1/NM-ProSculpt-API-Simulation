import { Hono } from "hono";

// ** import third-party libraries
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// ** import validators
import { ProgressSchema, ProgressRequest } from "@/validation/progress";

const nm_api = new Hono();

nm_api.post(
  "/nm/api/student/progress",
  zValidator("json", ProgressSchema),
  async (c) => {
    try {
      // Validate the request body
      const requestBody: ProgressRequest = c.req.valid("json");

      const { user_id, course_id } = requestBody;

      // Simulate fetching student progress information
      const progress_percentage = "12.02";
      const certificate_issued = "false";
      const assessment_status = "false";
      const course_complete = "false";

      // Assuming the process is successful
      return c.json({
        progress_percentage,
        certificate_issued,
        assessment_status,
        course_complete,
      });

    } catch (error: any) {
      console.error(`Error in - POST /nm/api/student/progress API: ${error}`);

      if (error instanceof z.ZodError) {
        return c.json(
          {
            progress_status: false,
            message: "Validation error.",
            errors: error.errors,
          },
          400,
        );
      }

      return c.json(
        {
          progress_status: false,
          message: "Error while fetching student progress information.",
          data: error.message,
        },
        500,
      );
    }
  },
);

export default nm_api;
