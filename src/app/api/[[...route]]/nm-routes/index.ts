import { Hono } from "hono";

// ** import api
import { course_api } from "./course";
import { token_api } from "./token";

export const nm_router = new Hono();

nm_router.route("/course", course_api);
nm_router.route("/token", token_api);
