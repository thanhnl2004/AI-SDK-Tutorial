import { generateObject } from "ai";
import { model } from "./llm-model.ts";

export const classifySentiment = async (text: string) => {
  const { object } = await generateObject({
    model,
    output: "enum",
    enum: ["positive", "negative", "neutral"],
    prompt: text,
    system: 
    `Classify the sentiment of the text as either` + 
    `positive, negative, or neutral.`,
  });

  return object;
}

const sentiment = await classifySentiment("I'm really happy today!");
console.log(sentiment);