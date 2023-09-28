import { Hono } from "hono";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

connectDB();

const app = new Hono();
app.get("/", (c) => c.text("API is running!"));

app.route("/api/user", userRoutes)

export default app;
