import { generateArticle } from './src/utils/ai.js';
process.env.GEMINI_API_KEY = "AQ.Ab8RN6LXOGBTzGmgVy9Zzs5i9lptTcIyew-CqcVpiyBJqn5e8g";

async function test() {
  try {
    console.log("Testing generateArticle...");
    const res = await generateArticle("Benefits of Paperless", "id", "");
    console.log("Result:", res);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
