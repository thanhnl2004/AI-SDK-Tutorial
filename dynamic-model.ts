import { generateText, type LanguageModel } from "ai";
import { model } from "./main.ts";

import { google } from "@ai-sdk/google";
export const aks = async (
  prompt: string,
  model: LanguageModel,
) => {
  const { text } = await generateText({
    model,
    prompt
  });

  return text;
};

const prompt = "What is the capital of Vietnam?";

const result = await aks(prompt, model);
console.log(result);
