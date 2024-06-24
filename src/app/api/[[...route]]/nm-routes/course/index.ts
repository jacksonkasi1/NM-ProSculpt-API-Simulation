import { Hono } from "hono";

// ** import validator & types
import { zValidator } from "@hono/zod-validator";
import { SubscribeSchema } from "@/validation/subscribe";

// ** import types
import { SubscribeRequest } from "@/types/subscribe";

export const course_api = new Hono();
