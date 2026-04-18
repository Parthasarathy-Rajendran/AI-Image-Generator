import { generateImage } from "./server/images";

async function main() {
  console.log("Running server action...");
  try {
    const res = await generateImage("A realistic cat");
    console.log("Response:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}
main();
