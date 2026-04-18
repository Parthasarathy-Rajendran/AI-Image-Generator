"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import fs from "node:fs";

export async function generateImage(prompt: string) {
  console.log("API KEY LOADED?", process.env.GOOGLE_GENERATIVE_AI_API_KEY);

  const result = await generateText({
    model: google("gemini-2.5-flash-image"),
    prompt,
  });

  let fileName = "";

  for (const file of result.files) {
    if (file.mediaType.startsWith("image/")) {
      const timestamp = Date.now();
      fileName = `generated-${timestamp}.png`;
      
      // Different versions of AI SDK store the binary block in different properties. 
      // We check the most common ones or decode it from the base64 fallback.
      const anyFile = file as any;
      const dataToWrite = anyFile.uint8ArrayData || anyFile.data || anyFile.uint8Array || Buffer.from(anyFile.base64Data, 'base64');
      
      await fs.promises.writeFile(`public/${fileName}`, dataToWrite);
    }
  }

  return `/${fileName}`;
}
