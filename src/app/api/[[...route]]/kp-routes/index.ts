import { Hono } from "hono";

// ** import api
import { course_api } from "./course";
import { nm_api } from "./student";

export const kp_router = new Hono();

kp_router.route("/course", course_api);
kp_router.route("/student", nm_api);
