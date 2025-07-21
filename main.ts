import { google } from "@ai-sdk/google";
import { generateText, streamText, type CoreMessage } from "ai";
import dotenv from "dotenv";

dotenv.config();

export const model = google("gemini-2.0-flash-exp");


export const answerMyQuestion = async (prompt: string) => {
  const { text } = await generateText({ // object with text property
    model,
    prompt,
  });

  return text;
};

export const answerMyQuestionWithStream = async (prompt: string) => {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
};

const question = "What is the color of the sun?";
console.log(await answerMyQuestionWithStream(question));


const coreMessages: CoreMessage[] = [
  {
    role: "system",
    content: "You are a helpful assistant that can answer questions and help with tasks.",
  },
  {
    role: "user",
    content: "hello",
  },
  {
    role: "assistant",
    content: "hi",
  },
];

