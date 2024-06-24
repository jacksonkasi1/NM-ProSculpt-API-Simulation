// ** import third-party libraries
import jwt from "jsonwebtoken";

// ** import config
import { env } from "@/config";

// Helper functions to generate tokens
export const generateAccessToken = (user_id: string) => {
  return jwt.sign({ user_id, token_type: "access" }, env.CLIENT_SECRET, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (user_id: string) => {
  return jwt.sign({ user_id, token_type: "refresh" }, env.CLIENT_SECRET, {
    expiresIn: "1d",
  });
};
