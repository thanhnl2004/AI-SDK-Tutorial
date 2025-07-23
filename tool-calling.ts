import { generateText, tool } from "ai";
import { model } from "./llm-model.ts";
import { z } from "zod";

const logToConsoleTool = tool({
  description: "Log a message to the console",
  parameters: z.object({
    message: z.string().describe("The message to log to the console"),
  }),
  execute: async ({ message }) => {
    console.log(message);
  }
})
  
const logToConsole = async(prompt: string) => {
  const { steps } = await generateText({
    model, 
    prompt,
    system: `Your only role is to log messages to the console. Use the tool provided to log the prompt tot he console`,
    tools: {
      logToConsoleTool
    }
  })

  console.dir(steps[0]?.toolResults, { depth: null }) // tool results can be fed back to the LLM 
}

await logToConsole("Hello, world!");