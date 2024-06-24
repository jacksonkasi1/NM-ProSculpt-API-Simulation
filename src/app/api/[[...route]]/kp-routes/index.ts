import { Hono } from "hono";

// ** import api
import { course_api } from "./course";
import { student_api } from "./student";
import { token_api } from "./token";

export const kp_router = new Hono();

kp_router.route("/token", token_api);
kp_router.route("/course", course_api);
kp_router.route("/student", student_api);
