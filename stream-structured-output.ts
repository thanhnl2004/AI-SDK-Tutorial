import { z } from "zod";
import { model } from "./llm-model.ts";
import { streamObject } from "ai";

const schema = z.object({
  recipe: z.object({
    name: z.string().describe("The name of the recipe"),
    ingredients: z.array(
      z.object({
        name: z.string().describe("The name of the ingredient"),
        amount: z.string().describe("The amount of the ingredient"),
      })
    ).describe("The ingredients needed for the recipe"),
    steps: z.array(z.string().describe("The steps to make the recipe")),
  })
})

const createRecipe = async (prompt: string) => {
  const result = await streamObject({ 
    model,
    system: 
    `You are helping a user create a recipe.
    Use British English variant of ingredient names,
    like Coriander over Cilantro.
    `,
    schemaName: "Recipe",
    schema,
    prompt,
  })// first chunk of the object


  for await (const obj of result.partialObjectStream) { // wait for each chunk to come in
    console.clear();
    console.dir(obj, { depth: null }); // streaming
  }

  const finalObject = await result.object;

  return finalObject.recipe;
}

const recipe = await createRecipe("How to make Peperoni Pizza");
