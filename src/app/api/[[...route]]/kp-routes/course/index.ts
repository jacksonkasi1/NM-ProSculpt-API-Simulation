import { Hono } from "hono";

// ** import third-party libraries
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// ** import validators
import { SubscribeSchema } from "@/validation/subscribe";
import { AccessRequest, AccessSchema } from "@/utils/validation/access";

// ** import types
import { SubscribeRequest } from "@/types/subscribe";

// ** import middleware
import { kpAuthMiddleware } from "@/utils/middleware/kp-auth";

export const course_api = new Hono();

course_api.use("/*", kpAuthMiddleware);

course_api.get("/", async (c) => {
  return c.json({
    message: " Welcome to the knowledge partner course API.",
  });
});

course_api.post(
  "/subscribe",
  zValidator("json", SubscribeSchema),
  async (c) => {
    try {
      const {
        course_id,
        user_id,
        branch_name,
        college_code,
        college_name,
        district,
        student_name,
        university,
      }: SubscribeRequest = await c.req.valid("json");

      // #Todo: Call the Moodle API to subscribe to a course using the user ID and course ID along with the authorization token.

      // Process the subscription
      const subscription_reference_id = "uuid-xxxxx"; // This should be generated dynamically on Moodle LMS. Map course and user details to Moodle LMS

      // Assuming subscription process is successful
      return c.json({
        subscription_registration_status: true,
        subscription_reference_id,
      });
    } catch (error: any) {
      console.error(`Error in - POST /subscribe API: ${error}`);
      if (error instanceof z.ZodError) {
        return c.json(
          {
            progress_status: false,
            message: "Validation error.",
            errors: error.errors,
          },
          400
        );
      }

      return c.json(
        {
          subscription_registration_status: false,
          message: "Error while subscribing to course.",
          data: error?.message! || error,
        },
        500
      );
    }
  }
);

course_api.post("/access", zValidator("json", AccessSchema), async (c) => {
  try {
    // Validate the request body
    const requestBody: AccessRequest = c.req.valid("json");

    const {
      user_id,
      course_id,
      student_name,
      college_code,
      college_name,
      branch_name,
      district,
      university,
    } = requestBody;

    // #Todo: Call the Moodle API to get course access using the user and course IDs along with the authorization token.

    // Simulate the access URL generation process
    const access_url =
      "https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044"; // This should be generated dynamically on Moodle LMS

    // Assuming the access process is successful
    return c.json({
      access_status: true,
      access_url,
    });
  } catch (error: any) {
    console.error(`Error in - POST /course/access API: ${error}`);

    if (error instanceof z.ZodError) {
      return c.json(
        {
          access_status: false,
          message: "Validation error.",
          errors: error.errors,
        },
        400
      );
    }

    return c.json(
      {
        access_status: false,
        message: "Error while accessing course.",
        data: error.message,
      },
      500
    );
  }
});
