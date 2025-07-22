import { google } from "@ai-sdk/google";
import { generateText, streamText, type CoreMessage } from "ai";
import dotenv from "dotenv";
import { startServer } from "./server.ts";

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

// const question = "What is the color of the sun?";
// console.log(await answerMyQuestionWithStream(question));


const messagesToSend: CoreMessage[] = [
  {
    role: "user",
    content: "What is the capital of Wales?"
  }
]

const server = await startServer();  


const response = await fetch("http://localhost:4000/api/get-completions", {
  method: "POST",
  body: JSON.stringify(messagesToSend),
  headers: {
    "Content-Type": "application/json",
  },
});

const newMessages = await response.json() as CoreMessage[];
const allMessages = [...messagesToSend, ...newMessages];

console.dir(allMessages, { depth: null });

server.close();