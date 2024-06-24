import { z } from "zod";

// Define the schema using zod
export const TokenSchema = z.object({
  client_key: z.string().min(1, { message: "client_key is required" }),
  client_secret: z.string().min(1, { message: "client_secret is required" }),
});

export type TokenRequest = z.infer<typeof TokenSchema>;

export const RefreshTokenSchema = z.object({
  refresh: z.string().min(1, { message: "refresh token is required" }),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenSchema>;
