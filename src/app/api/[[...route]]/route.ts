import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

// ** import routes
import { kp_router } from "./kp-routes";
import { nm_router } from "./nm-routes";

const app = new Hono().basePath("/api");
app.use("*", cors());

app.get("/", async (c) => {
  return c.json({ message: "Prosculpt Academy server running..." });
});

app.route("/kp", kp_router);
app.route("/lms/client", nm_router);

export const GET = handle(app);
export const POST = handle(app);

export default app as never;
