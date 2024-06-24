import { Context, Next } from "hono";

// ** import third-party libraries
import jwt from "jsonwebtoken";

// ** import config
import { env } from "@/config";

// Define a type for the payload that will be extracted from the token
interface TokenPayload {
  instance_id: string;
  token_type: string;
}

// Middleware to verify the JWT token
export const kpAuthMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Authorization header missing or invalid" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.CLIENT_SECRET) as TokenPayload;

    if (payload.token_type !== "access") {
      return c.json({ message: "Invalid token type" }, 401);
    }

    // Set the instance information in the context
    c.set("instance", { instance_id: payload.instance_id });

    await next();
  } catch (error) {
    return c.json({ message: "Invalid or expired token" }, 401);
  }
};
