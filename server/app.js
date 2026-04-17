import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";

const app = new Hono();
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());


app.get("/", (c) => c.text("OK"));

let visits = 0;
app.get("/api/visits", (c) => {
  visits++;
  return c.json({ visits });
});


// retrieving todos from database on requests to /api/todos
app.get("/api/todos", async (c) => {
  const todos = await sql`SELECT * FROM todos`;
  return c.json(todos);
});

export default app;