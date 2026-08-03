import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AQ.Ab8RN6LXOGBTzGmgVy9Zzs5i9lptTcIyew-CqcVpiyBJqn5e8g");

async function listModels() {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AQ.Ab8RN6LXOGBTzGmgVy9Zzs5i9lptTcIyew-CqcVpiyBJqn5e8g");
    const data = await response.json();
    console.log(data.models.map((m: any) => m.name));
  } catch (e) {
    console.error(e);
  }
}

listModels();
