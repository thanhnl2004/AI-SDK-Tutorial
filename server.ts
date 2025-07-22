import { Hono } from "hono";
import { model } from "./main.ts";
import { serve } from "@hono/node-server";
import { once } from "events";
import { generateText, type CoreMessage } from "ai";
export const startServer = async () => {
  const app = new Hono();

  app.post("/api/get-completions", async (ctx) => {
    const messages: CoreMessage[] = await ctx.req.json();
    const result = await generateText({
      model,
      messages,
    });

    return ctx.json(result.response.messages);
  })

  const server = serve({
    fetch: app.fetch,
    port: 4000,
    hostname: "0.0.0.0",
  })

  await once(server, "listening");

  return server;
}

