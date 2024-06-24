import { Hono } from "hono";

// ** import api
import { course_api } from "./course";

export const nm_router = new Hono();

nm_router.route("/course", course_api);
