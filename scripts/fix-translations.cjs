const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

file = file.replace(/"file\.locked\.notice":\s*".*?"/g, (match) => {
  if (match.includes('password-protected')) return '"file.locked.notice": "File encrypted. Please decrypt it using the Unlock PDF tool first."';
  if (match.includes('File ini dilindungi')) return '"file.locked.notice": "File terenkripsi. Silakan buka kuncinya di menu Unlock PDF terlebih dahulu."';
  if (match.includes('protegido por contrase')) return '"file.locked.notice": "Archivo encriptado. Por favor, descífrelo usando la herramienta Desbloquear PDF primero."';
  if (match.includes('protegido por senha')) return '"file.locked.notice": "Arquivo criptografado. Descriptografe-o usando a ferramenta Desbloquear PDF primeiro."';
  if (match.includes('passwortgesch')) return '"file.locked.notice": "Datei verschlüsselt. Bitte zuerst mit dem Unlock PDF Tool entschlüsseln."';
  if (match.includes('mot de passe')) return '"file.locked.notice": "Fichier crypté. Veuillez d\'abord le décrypter avec l\'outil Unlock PDF."';
  
  return '"file.locked.notice": "ファイルが暗号化されています。まずUnlock PDFツールで復号化してください。"';
});

fs.writeFileSync('src/data/translations.ts', file, 'utf8');
console.log('Translations updated.');
