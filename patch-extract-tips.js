const fs = require('fs');
const path = require('path');

const filePath = path.join('D:', 'Tacopdf', 'src', 'data', 'translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // English
  {
    old: "tool.extract_pages.howto.1": "Upload your PDF file into the dropzone.",\r\n    "tool.extract_pages.howto.2": "Type the specific page numbers or ranges you want to keep.",\r\n    "tool.extract_pages.howto.3": "Click 'Run Extract Pages' to split those pages into an independent document.",\r\n    "tool.extract_pages.tips.1": "You can reorder pages by specifying the range out of order.",,
    new: "tool.extract_pages.howto.1": "Upload your PDF file to reveal the visual grid.",\r\n    "tool.extract_pages.howto.2": "Click directly on any page you want to extract.",\r\n    "tool.extract_pages.howto.3": "Choose your merge preference and click 'Run Extract Pages'.",\r\n    "tool.extract_pages.tips.1": "Selected pages will be highlighted. Click again to undo your selection easily.",
  },
  // Indonesian
  {
    old: "tool.extract_pages.howto.1": "Unggah file PDF Anda ke dropzone.",\r\n    "tool.extract_pages.howto.2": "Ketik nomor halaman atau rentang spesifik yang ingin disimpan.",\r\n    "tool.extract_pages.howto.3": "Klik 'Jalankan Ekstrak Halaman' untuk memisahkan halaman tersebut menjadi dokumen independen.",\r\n    "tool.extract_pages.tips.1": "Anda dapat mengatur ulang halaman dengan menentukan rentang yang tidak berurutan.",,
    new: "tool.extract_pages.howto.1": "Unggah file PDF Anda untuk memunculkan visual grid.",\r\n    "tool.extract_pages.howto.2": "Klik langsung pada halaman mana pun yang ingin Anda ekstrak.",\r\n    "tool.extract_pages.howto.3": "Pilih pengaturan gabung (merge) dan klik 'Jalankan Ekstrak Halaman'.",\r\n    "tool.extract_pages.tips.1": "Halaman terpilih akan disorot. Klik sekali lagi untuk membatalkan pilihan dengan mudah.",
  },
  // Spanish
  {
    old: "tool.extract_pages.howto.1": "Sube tu archivo PDF al área de carga.",\r\n    "tool.extract_pages.howto.2": "Escribe los números de página o rangos específicos que deseas conservar.",\r\n    "tool.extract_pages.howto.3": "Haz clic en 'Ejecutar Extraer Páginas' para separar esas páginas.",\r\n    "tool.extract_pages.tips.1": "Puedes reordenar páginas especificando el rango fuera de orden.",,
    new: "tool.extract_pages.howto.1": "Sube tu archivo PDF para mostrar la cuadrícula visual.",\r\n    "tool.extract_pages.howto.2": "Haz clic directamente en cualquier página que desees extraer.",\r\n    "tool.extract_pages.howto.3": "Elige tu preferencia de combinación y haz clic en 'Ejecutar Extraer Páginas'.",\r\n    "tool.extract_pages.tips.1": "Las páginas seleccionadas se resaltarán. Haz clic de nuevo para deshacer tu selección fácilmente.",
  },
  // Japanese
  {
    old: "tool.extract_pages.howto.1": "PDF???????????????????????",\r\n    "tool.extract_pages.howto.2": "?????????????????????????",\r\n    "tool.extract_pages.howto.3": "????????????????????????????????????????????",\r\n    "tool.extract_pages.tips.1": "????????????????????????????????",,
    new: "tool.extract_pages.howto.1": "PDF??????????????????????????????",\r\n    "tool.extract_pages.howto.2": "???????????????????",\r\n    "tool.extract_pages.howto.3": "??????????????????????????????",\r\n    "tool.extract_pages.tips.1": "??????????????????????????????????????????",
  },
  // Portuguese
  {
    old: "tool.extract_pages.howto.1": "Carregue o seu ficheiro PDF para a área de transferência.",\r\n    "tool.extract_pages.howto.2": "Introduza os números de página específicos ou os intervalos que pretende manter.",\r\n    "tool.extract_pages.howto.3": "Clique em 'Executar Extrair Páginas' para separar essas páginas num documento independente.",\r\n    "tool.extract_pages.tips.1": "Pode reordenar as páginas especificando o intervalo fora de ordem.",,
    new: "tool.extract_pages.howto.1": "Carregue o seu arquivo PDF para revelar a grade visual.",\r\n    "tool.extract_pages.howto.2": "Clique diretamente em qualquer página que deseja extrair.",\r\n    "tool.extract_pages.howto.3": "Escolha sua preferência de mesclagem e clique em 'Executar Extrair Páginas'.",\r\n    "tool.extract_pages.tips.1": "As páginas selecionadas serão destacadas. Clique novamente para desfazer sua seleção facilmente.",
  },
  // German
  {
    old: "tool.extract_pages.howto.1": "Laden Sie Ihre PDF-Datei hoch.",\r\n    "tool.extract_pages.howto.2": "Geben Sie die spezifischen Seitenzahlen oder Bereiche ein, die Sie behalten möchten.",\r\n    "tool.extract_pages.howto.3": "Klicken Sie auf 'Seiten extrahieren ausführen', um diese Seiten in ein unabhängiges Dokument aufzuteilen.",\r\n    "tool.extract_pages.tips.1": "Sie können Seiten neu anordnen, indem Sie den Bereich in einer anderen Reihenfolge angeben.",,
    new: "tool.extract_pages.howto.1": "Laden Sie Ihre PDF-Datei hoch, um das visuelle Raster anzuzeigen.",\r\n    "tool.extract_pages.howto.2": "Klicken Sie direkt auf eine Seite, die Sie extrahieren möchten.",\r\n    "tool.extract_pages.howto.3": "Wählen Sie Ihre Zusammenführungseinstellung und klicken Sie auf 'Seiten extrahieren ausführen'.",\r\n    "tool.extract_pages.tips.1": "Ausgewählte Seiten werden hervorgehoben. Klicken Sie erneut, um Ihre Auswahl einfach rückgängig zu machen.",
  },
  // French
  {
    old: "tool.extract_pages.howto.1": "Téléchargez votre fichier PDF.",\r\n    "tool.extract_pages.howto.2": "Tapez les numéros de page ou les plages spécifiques que vous souhaitez conserver.",\r\n    "tool.extract_pages.howto.3": "Cliquez sur 'Exécuter Extraire des pages' pour diviser ces pages en un document indépendant.",\r\n    "tool.extract_pages.tips.1": "Vous pouvez réorganiser les pages en spécifiant la plage dans le désordre.",,
    new: "tool.extract_pages.howto.1": "Téléchargez votre fichier PDF pour afficher la grille visuelle.",\r\n    "tool.extract_pages.howto.2": "Cliquez directement sur la page que vous souhaitez extraire.",\r\n    "tool.extract_pages.howto.3": "Choisissez votre préférence de fusion et cliquez sur 'Exécuter Extraire des pages'.",\r\n    "tool.extract_pages.tips.1": "Les pages sélectionnées seront mises en évidence. Cliquez à nouveau pour annuler facilement votre sélection.",
  }
];

let successCount = 0;
for (const replacement of replacements) {
  if (content.includes(replacement.old)) {
    content = content.replace(replacement.old, replacement.new);
    successCount++;
  } else {
    console.log("Failed to find: ", replacement.old.substring(0, 50) + "...");
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced ' + successCount + ' blocks.');
