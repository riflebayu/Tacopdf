const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = [
  // 1. en
  `\n    "tool.pdf-to-image.info": "If your PDF has multiple pages, they will be downloaded as a single ZIP file containing all images.",`,
  // 2. id
  `\n    "tool.pdf-to-image.info": "Jika PDF Anda memiliki banyak halaman, semuanya akan diunduh sebagai satu file ZIP berisi semua gambar.",`,
  // 3. es
  `\n    "tool.pdf-to-image.info": "Si su PDF tiene varias páginas, se descargarán como un solo archivo ZIP que contiene todas las imágenes.",`,
  // 4. ja
  `\n    "tool.pdf-to-image.info": "PDFに複数のページがある場合、それらはすべての画像を含む単一のZIPファイルとしてダウンロードされます。",`,
  // 5. pt
  `\n    "tool.pdf-to-image.info": "Se o seu PDF tiver várias páginas, elas serão baixadas como um único arquivo ZIP contendo todas as imagens.",`,
  // 6. de
  `\n    "tool.pdf-to-image.info": "Wenn Ihr PDF mehrere Seiten hat, werden diese als einzelne ZIP-Datei heruntergeladen, die alle Bilder enthält.",`,
  // 7. fr
  `\n    "tool.pdf-to-image.info": "Si votre PDF comporte plusieurs pages, elles seront téléchargées sous la forme d'un seul fichier ZIP contenant toutes les images.",`
];

let counter = 0;
file = file.replace(/("favorites\.reset":\s*".*?"),/g, (match) => {
  const replacement = additions[counter] + "\n    " + match;
  counter++;
  return replacement;
});

fs.writeFileSync('src/data/translations.ts', file, 'utf8');
console.log('Injected ' + counter + ' translations!');
