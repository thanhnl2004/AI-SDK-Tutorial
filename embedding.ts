import { google } from "@ai-sdk/google";
import dotenv from "dotenv";
import { embedMany, embed, cosineSimilarity } from "ai";

dotenv.config();

const model = google.textEmbeddingModel("text-embedding-004");

const values = ["Dog", "Cat", "Car", "Bike"];

const { embeddings } = await embedMany({ // embedding is a vector of many dimensions
  model,
  values,
});

const vectorDatabase = embeddings.map( // map to an array of object of the word and its embedding
  (embedding, index) => ({
    value: values[index],
    embedding
  })
);

const searchTerm = await embed({
  model,
  value: "Kitten"
});

const entries = vectorDatabase.map((entry) => {
  return {
    value: entry.value,
    similarity: cosineSimilarity(searchTerm.embedding, entry.embedding),
  }
});

const sortedEntries = entries.sort((a, b) => b.similarity - a.similarity);

console.dir(sortedEntries, { depth: null });