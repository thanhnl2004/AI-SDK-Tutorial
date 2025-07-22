import { generateText } from "ai";
import { model } from "./llm-model.ts";

const systemPrompt = 
`You will receive an image.` +
`Please create an alt text for the image.` +
`Be concise.` +
`Use adjectives only when necessary.` +
`Do not pass 160 characters.` +
`Use simple language.`;

export const describeImage = async (imageUrl: string) => {
  const { text } = await generateText({
    model,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(imageUrl),
          }
        ]
      }
    ]
  })

  return text;
}

const description = await describeImage(
  "https://images2.minutemediacdn.com/image/upload/c_crop,w_2965,h_1667,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_lakers/01k0fdh42nxnkhdw5c71.jpg"
);
console.log(description);