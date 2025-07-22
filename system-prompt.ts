import { generateText } from "ai";
import { model } from "./llm-model.ts";

const systemPrompt = `
You are a text summarizer.
Summarize the text you receive.
Be concise.
Return only the summary.
Do not use the phrase "here is a summary".
Highlight relevant phrases in bold.
The summary should be two sentences long.
`;

export const summarizeText = async (input: string) => {
  const { text } = await generateText({
    model,
    system: systemPrompt,
    prompt: input,
  });

  const { text: summary } = await generateText({
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  return text;
};

const input = "Describe the process of making a cup of coffee.";
const summary = await summarizeText(input);
console.log(summary);
