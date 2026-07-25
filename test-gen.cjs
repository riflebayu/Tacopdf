require('dotenv').config();
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const targets = ['pt', 'de'];
const chunkJsonStructure = targets.reduce((acc, code) => { 
  acc[code] = { slug: 's', title: 't', metaDescription: 'm', content: 'c' }; 
  return acc; 
}, {});
const sys = `STRUKTUR OUTPUT (WAJIB JSON MURNI): Kamu HARUS MENGEMBALIKAN respons HANYA dalam bentuk objek JSON (JSON object). DILARANG menuliskan teks apa pun di luar JSON. Struktur JSON HARUS persis seperti ini dan mencakup SEMUA bahasa: ${JSON.stringify(chunkJsonStructure, null, 2)}`;
groq.chat.completions.create({ 
  messages: [
    { role: 'system', content: sys }, 
    { role: 'user', content: 'Buat artikel tentang TacoPDF' }
  ], 
  model: 'llama-3.3-70b-versatile', 
  response_format: { type: 'json_object' } 
}).then(res => console.log('RESULT:', res.choices[0].message.content)).catch(err => console.error('ERROR:', err));
