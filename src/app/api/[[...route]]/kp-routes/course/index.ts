import { Hono } from "hono";

// ** import validator & types
import { zValidator } from "@hono/zod-validator";
import { SubscribeSchema } from "@/validation/subscribe";

// ** import types
import { SubscribeRequest } from "@/types/subscribe";

export const course_api = new Hono();

course_api.post("/subscribe", zValidator("json", SubscribeSchema), async (c) => {
  try {
    const data: SubscribeRequest = await c.req.valid("json");

    // Process the subscription
    const subscription_reference_id = "123HJssjggI"; // This should be generated dynamically

    // Assuming subscription process is successful
    return c.json({
      subscription_registration_status: true,
      subscription_reference_id,
    });
  } catch (error: any) {
    console.error(`Error in - POST /subscribe API: ${error}`);
    return c.json(
      {
        subscription_registration_status: false,
        message: "Error while subscribing to course.",
        data: error?.message! || error,
      },
      500,
    );
  }
});
