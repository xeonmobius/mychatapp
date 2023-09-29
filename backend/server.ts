import { Hono } from "hono";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

connectDB();

const app = new Hono();

app.notFound((c) => {
  return c.text(`Not Found ${c.req.url}`, 404);
});

app.onError((err, c) => {
  const statusCode = c.res.status === 200 ? 500 : c.res.status;
  c.status(statusCode);
  return c.json({
    message: err.message,
    stack: Bun.env.BUN_ENV! === "production" ? null : err.stack,
  });
});

app.get("/", (c) => c.text("API is running!"));

app.route("/api/user", userRoutes);

export default app;
