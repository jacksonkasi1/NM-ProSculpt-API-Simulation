import { Hono } from "hono";

// ** import third-party libraries
import jwt from "jsonwebtoken";
import { zValidator } from "@hono/zod-validator";

// ** import config
import { env } from "@/config";

// ** import validators
import {
  TokenSchema,
  TokenRequest,
  RefreshTokenSchema,
  RefreshTokenRequest,
} from "@/validation/token";

// ** import helpers
import { generateAccessToken, generateRefreshToken } from "@/helpers/token";

export const token_api = new Hono();


token_api.get("/", async (c) => {
  return c.json({
    message: " Welcome to the knowledge partner token API.",
  });
});

// Token retrieval endpoint
token_api.post("/", zValidator("json", TokenSchema), async (c) => {
  try {
    const { client_key, client_secret }: TokenRequest = c.req.valid("json");

    if (client_key !== env.CLIENT_KEY || client_secret !== env.CLIENT_SECRET) {
      return c.json(
        {
          success: false,
          message: "Invalid client credentials.",
        },
        401,
      );
    }

    const user_id = "some_user_id"; // Replace with actual user ID logic
    const access_key = generateAccessToken(user_id);
    const refresh_key = generateRefreshToken(user_id);

    return c.json({
      access_key,
      refresh_key,
    });
  } catch (error: any) {
    console.error(`Error in - POST /token API: ${error}`);
    return c.json(
      {
        success: false,
        message: "Error while generating tokens.",
        data: error?.message || error,
      },
      500,
    );
  }
});

// Refresh token endpoint
token_api.post(
  "/refresh",
  zValidator("json", RefreshTokenSchema),
  async (c) => {
    try {
      const { refresh }: RefreshTokenRequest = c.req.valid("json");

      try {
        const payload: any = jwt.verify(refresh, env.CLIENT_SECRET);
        if (payload.token_type !== "refresh") {
          throw new Error("Invalid token type");
        }

        const access_key = generateAccessToken(payload.user_id);

        return c.json({
          access_key,
        });
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Invalid refresh token.",
          },
          401,
        );
      }
    } catch (error: any) {
      console.error(`Error in - POST /token/refresh API: ${error}`);
      return c.json(
        {
          success: false,
          message: "Error while refreshing token.",
          data: error?.message || error,
        },
        500,
      );
    }
  },
);
