import { Hono } from "hono";
import { model } from "./main.ts";
import { serve } from "@hono/node-server";

export const startServer = async () => {
  const app = new Hono();

  app.post("/api/get-completions", async (ctx) => {
    // 
  })

  const server = serve({
    fetch: app.fetch,
    port: 4000,
    hostname: "0.0.0.0",
  })

  console.log("Server is running on port 3000");
  


}