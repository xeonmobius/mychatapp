import { Hono } from "hono";
import { chats } from "./data/data";


// const port = Bun.env.PORT

const app = new Hono();
app.get("/", (c) => c.text("API is running!"));

app.get("/api/chats", (c) => c.json(chats));

app.get("/api/chat/:id", (c) => {
    const id = c.req.param("id");
    const singleChat = chats.find((chat) => chat._id === id);
    return c.json(singleChat)
});

export default app;
