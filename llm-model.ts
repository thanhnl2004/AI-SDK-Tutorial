import { google } from "@ai-sdk/google";
import dotenv from "dotenv";

dotenv.config();

export const model = google("gemini-2.0-flash");



