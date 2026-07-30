const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/VITE_FIREBASE_PROJECT_ID=[\"']?(.*?)[\"']?$/m);
if (match) {
  const pid = match[1].trim();
  console.log('Project ID:', pid);
  fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/articles`)
    .then(res => res.json())
    .then(data => console.log(JSON.stringify(data).substring(0, 500) + '...'))
    .catch(console.error);
}
