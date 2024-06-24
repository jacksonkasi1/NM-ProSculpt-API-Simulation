import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
  server: {
    CLIENT_SECRET: z.string().min(1, { message: "CLIENT_SECRET is required" }),
    CLIENT_KEY: z.string().min(1, { message: "CLIENT_KEY is required" }),
  },
  client: {},
  runtimeEnv: {
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CLIENT_KEY: process.env.CLIENT_KEY,
  },
});
