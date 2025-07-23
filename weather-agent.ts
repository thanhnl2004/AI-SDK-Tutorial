import { generateText, streamText } from "ai";
import { model } from "./llm-model.ts";
import { tool } from "ai";
import { z } from "zod";

const getWeatherTool = tool({
  description: "Get the weather in a given city",
  parameters: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
  execute: async ({ city }) => {
    return `The weather in ${city} is sunny` // actual implementation would be a call to a weather API
  }
});

const askQuestion = async (prompt: string) => {
  const { textStream, steps } = await streamText({ 
    model,
    prompt,
    system: `You are a helpful weather agent. Use the tool provided to get the weather in a given city.`,
    tools: {
      getWeatherTool
    },
    maxSteps: 10
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  // console.dir(await steps, { depth: null });
}

await askQuestion("What is the weather in London?");