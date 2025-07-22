import { z } from "zod";
import { model } from "./llm-model.ts";
import { generateObject } from "ai";
import { readFileSync } from "fs";
import path from "path";

const schema = z.object({
  firstName: z.string().describe("The first name of the person"),
  lastName: z.string().describe("The last name of the person"),
  email: z.string().describe("The email of the person"),
  phone: z.string().describe("The phone number of the person"),
}).describe("The data of the person");

export const extractDataFromFilePath = async (filePath: string) => {
  const { object } = await generateObject({
    model, 
    system: `you will receive an invoice` + 
    `extract the data of the person from the invoice`,
    schema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: readFileSync(filePath), 
            mimeType: "application/pdf",
          }
        ]
      }
    ]
  });

  return object;
}

const result = await extractDataFromFilePath(
  path.join(import.meta.dirname, "./resume.pdf")
);

// console.log(result);
console.dir(result, { depth: null });