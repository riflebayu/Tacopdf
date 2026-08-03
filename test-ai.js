import { suggestTopics } from './src/utils/ai.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    console.log("Testing suggestTopics...");
    const res = await suggestTopics();
    console.log("Result:", res);
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
