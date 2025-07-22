import { z } from "zod";
import { model } from "./llm-model.ts";
import { generateObject } from "ai";
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

export const createRecipe = async(prompt: string) => {
  const { object } = await generateObject({
    model,
    schema,
    prompt,
    schemaName: "Recipe",
    system: 
    `You are helping a user create a recipe.
    Use British English variant of ingredient names,
    like Coriander over Cilantro.
    `
  })

  return object.recipe;
}

const recipe = await createRecipe("How to make Bun Cha");
console.log(recipe);