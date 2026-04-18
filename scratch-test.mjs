import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import fs from "node:fs";

async function testGeneration() {
  console.log("Using API Key:", process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "Loaded" : "Not Loaded");
  try {
    const resultText = await generateText({
      model: google("gemini-2.5-flash-image"),
      prompt: "A beautiful sunset",
    });
    if (resultText.files && resultText.files.length > 0) {
         console.log("Files generated:", resultText.files.length);
         console.log("Media type:", resultText.files[0].mediaType);
         const file = resultText.files[0];
         console.log("File Keys:", Object.keys(file));
         console.log("Is data a string or buffer?", typeof file.data, typeof file.uint8Array, Buffer.isBuffer(file.data));
         const data = file.data || file.uint8Array; 
         if (!data) console.log("NO DATA RECEIVED");
         else console.log("Data size:", data.length);
    } else {
         console.log("No files returned natively.");
    }
  } catch (e) {
    console.error("generateText error:", e);
  }
}

testGeneration();
