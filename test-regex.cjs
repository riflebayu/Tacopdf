const data = require('./src/data/toolSeoData.json'); 
const content = data['merge']['en']; 
const regex = /<strong>(?:Q|T|P|F)\s*:\s*(.*?)<\/strong>\s*<br\s*\/>\s*(?:A|J|R)\s*:\s*(.*?)(?=<\/p>)/gi; 
const matches = [...content.matchAll(regex)]; 
console.log(matches.length, matches.map(m => m[1]));
