// ** import third-party libraries
import jwt from "jsonwebtoken";

// ** import config
import { env } from "@/config";

// Helper functions to generate tokens (from NM server)
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

// Helper functions to generate tokens (from KP server)
export const generateKPAccessToken = (instance_id: string) => {
  return jwt.sign({ instance_id, token_type: "access" }, env.CLIENT_SECRET, {
    expiresIn: "1h",
  });
};

export const generateKPRefreshToken = (instance_id: string) => {
  return jwt.sign({ instance_id, token_type: "refresh" }, env.CLIENT_SECRET, {
    expiresIn: "1d",
  });
};
