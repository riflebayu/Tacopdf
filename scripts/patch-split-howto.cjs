const fs = require('fs');

const tsFile = fs.readFileSync('src/data/translations.ts', 'utf8');
const objStr = tsFile.replace('export const TRANSLATIONS = ', '');

fs.writeFileSync('scripts/temp-split-howto.cjs', `module.exports = ${objStr}`);

const TRANSLATIONS = require('../scripts/temp-split-howto.cjs');

const splitHowToTranslations = {
  en: {
    'tool.split.howto.1': "Upload the PDF document you want to split.",
    'tool.split.howto.2': "Click on the pages you want to extract as independent PDFs.",
    'tool.split.howto.3': "Click 'Run Split PDF' to download them as a ZIP file.",
    'tool.split.tips.1': "If you do not select any pages, the tool will automatically split all pages in the document into single PDF files."
  },
  id: {
    'tool.split.howto.1': "Unggah dokumen PDF yang ingin Anda pisahkan.",
    'tool.split.howto.2': "Klik pada halaman-halaman yang ingin Anda pisahkan menjadi berkas PDF mandiri.",
    'tool.split.howto.3': "Klik 'Jalankan Pisah PDF' untuk mengunduhnya dalam format ZIP.",
    'tool.split.tips.1': "Jika Anda tidak memilih halaman apa pun, sistem akan otomatis memecah seluruh halaman di dokumen tersebut menjadi PDF tunggal."
  },
  es: {
    'tool.split.howto.1': "Sube el documento PDF que deseas dividir.",
    'tool.split.howto.2': "Haz clic en las páginas que deseas extraer como PDF independientes.",
    'tool.split.howto.3': "Haz clic en 'Ejecutar Dividir PDF' para descargarlas como un archivo ZIP.",
    'tool.split.tips.1': "Si no seleccionas ninguna página, la herramienta dividirá automáticamente todas las páginas en archivos PDF individuales."
  },
  ja: {
    'tool.split.howto.1': "分割するPDFドキュメントをアップロードします。",
    'tool.split.howto.2': "独立したPDFとして抽出したいページをクリックします。",
    'tool.split.howto.3': "「PDFの分割を実行」をクリックしてZIPファイルとしてダウンロードします。",
    'tool.split.tips.1': "ページを選択しない場合、ドキュメント内のすべてのページが自動的に単一のPDFファイルに分割されます。"
  },
  pt: {
    'tool.split.howto.1': "Carregue o documento PDF que pretende dividir.",
    'tool.split.howto.2': "Clique nas páginas que deseja extrair como PDFs independentes.",
    'tool.split.howto.3': "Clique em 'Executar Dividir PDF' para baixá-las como um arquivo ZIP.",
    'tool.split.tips.1': "Se não selecionar nenhuma página, a ferramenta dividirá automaticamente todas as páginas em arquivos PDF individuais."
  },
  de: {
    'tool.split.howto.1': "Laden Sie das PDF-Dokument hoch, das Sie teilen möchten.",
    'tool.split.howto.2': "Klicken Sie auf die Seiten, die Sie als unabhängige PDFs extrahieren möchten.",
    'tool.split.howto.3': "Klicken Sie auf 'PDF aufteilen ausführen', um sie als ZIP-Datei herunterzuladen.",
    'tool.split.tips.1': "Wenn Sie keine Seiten auswählen, teilt das Tool automatisch alle Seiten in einzelne PDF-Dateien auf."
  },
  fr: {
    'tool.split.howto.1': "Téléchargez le document PDF que vous souhaitez diviser.",
    'tool.split.howto.2': "Cliquez sur les pages que vous souhaitez extraire en tant que PDF indépendants.",
    'tool.split.howto.3': "Cliquez sur 'Exécuter Diviser PDF' pour les télécharger sous forme de fichier ZIP.",
    'tool.split.tips.1': "Si vous ne sélectionnez aucune page, l'outil divisera automatiquement toutes les pages en fichiers PDF individuels."
  }
};

for (const lang in splitHowToTranslations) {
  if (TRANSLATIONS[lang]) {
    Object.assign(TRANSLATIONS[lang], splitHowToTranslations[lang]);
  }
}

const outContent = 'export const TRANSLATIONS = ' + JSON.stringify(TRANSLATIONS, null, 2) + ';';
fs.writeFileSync('src/data/translations.ts', outContent);
console.log('Successfully updated split how to translations');
