import { Hono } from "hono";

// ** import api
import { course_api } from "./course";

export const kp_router = new Hono();

kp_router.route("/course", course_api);
