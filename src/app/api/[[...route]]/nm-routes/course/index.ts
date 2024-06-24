import { Hono } from "hono";

// ** import third party libraries
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// ** import validators
import { PublishSchema, PublishRequest } from "@/validation/publish";
import { ProgressUpdateRequest, ProgressUpdateSchema } from "@/validation/progressUpdate";

// ** import middleware
import { authMiddleware } from "@/utils/middleware/auth";

export const course_api = new Hono();

course_api.use("/*", authMiddleware);

course_api.get("/", async (c) => {
  return c.json({
    message: "Welcome to the naan mudhalvan course API.",
  });
});

course_api.post("/publish", zValidator("json", PublishSchema), async (c) => {
  try {
    const requestBody: PublishRequest = c.req.valid("json");

    // Here you would typically send the course data to your backend or database
    console.log("Publishing course:", requestBody);

    // Mock success response
    return c.json({
      message:
        "Course has been sent for approval, you will get email as confirmation",
    });
  } catch (error: any) {
    console.error(`Error in - POST /course/publish API: ${error}`);
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
        message: "Error while publishing the course.",
        data: error?.message || error,
      },
      500
    );
  }
});


course_api.post(
    "/course/xf",
    zValidator("json", ProgressUpdateSchema),
    async (c) => {
      try {
        const requestBody: ProgressUpdateRequest = c.req.valid("json");
  
        // Here you would typically update the course progress in your backend or database
        console.log("Updating course progress:", requestBody);
  
        // Mock success response
        return c.json({
          message: "Course progress has been updated successfully.",
          data: requestBody,
        });
  
      } catch (error: any) {
        console.error(`Error in - POST /course/xf API: ${error}`);
        if (error instanceof z.ZodError) {
          return c.json(
            {
              success: false,
              message: "Validation error.",
              errors: error.errors,
            },
            400
          );
        }
  
        return c.json(
          {
            success: false,
            message: "Error while updating course progress.",
            data: error?.message || error,
          },
          500
        );
      }
    }
  );

