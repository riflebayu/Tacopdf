const fs = require('fs');

const data = {
  en: `
    "workspace.how_to_use": "How to Use & Tips",
    "workspace.how_to_title": "Instructions for",
    "workspace.tips_title": "Professional Tips",
    
    "tool.default.howto.1": "Select the PDF file you wish to process.",
    "tool.default.howto.2": "Configure the parameters in the settings panel.",
    "tool.default.howto.3": "Click the action button to execute the tool locally.",
    "tool.default.tips.1": "Preview your output before downloading.",
    "tool.default.tips.2": "All processing happens locally for maximum privacy.",
    "tool.default.tips.3": "Use custom output naming to keep files organized.",

    "tool.organize.howto.1": "Click 'Select PDF File' or drag and drop your document into the workspace.",
    "tool.organize.howto.2": "Drag any page thumbnail to reorder it within the document.",
    "tool.organize.howto.3": "Click the trash icon on a page to remove it completely.",
    "tool.organize.howto.4": "Click 'Save Changes' to generate your new organized PDF.",
    "tool.organize.tips.1": "You can use Shift+Scroll to navigate horizontally if you have many pages.",
    "tool.organize.tips.2": "Pages are completely removed from the file, reducing the final file size.",
    "tool.organize.tips.3": "The original file remains unmodified on your device.",

    "tool.compress.howto.1": "Upload the PDF document you want to compress.",
    "tool.compress.howto.2": "Select your desired compression level (Maximum, Balanced, or Low).",
    "tool.compress.howto.3": "Click 'Compress PDF' and wait for the process to finish.",
    "tool.compress.tips.1": "Maximum compression is best for emails but will reduce image quality.",
    "tool.compress.tips.2": "Balanced mode is recommended for general web sharing and archiving.",
    "tool.compress.tips.3": "Note: Compression flattens the PDF, meaning text will become images.",

    "tool.ocr.howto.1": "Upload a scanned PDF or an image containing text.",
    "tool.ocr.howto.2": "Select the language(s) present in your document for better accuracy.",
    "tool.ocr.howto.3": "Click 'Extract Text' and wait for the optical character recognition to complete.",
    "tool.ocr.tips.1": "Ensure your document is well-lit and has high contrast for the best results.",
    "tool.ocr.tips.2": "You can select multiple languages if your document is multilingual.",
    "tool.ocr.tips.3": "For digital PDFs containing images, check the 'Force Image OCR' option.",
`,
  id: `
    "workspace.how_to_use": "Cara Menggunakan & Tips",
    "workspace.how_to_title": "Instruksi untuk",
    "workspace.tips_title": "Tips Profesional",
    
    "tool.default.howto.1": "Pilih file PDF yang ingin Anda proses.",
    "tool.default.howto.2": "Konfigurasikan parameter di panel pengaturan.",
    "tool.default.howto.3": "Klik tombol aksi untuk menjalankan alat secara lokal.",
    "tool.default.tips.1": "Pratinjau hasil Anda sebelum mengunduh.",
    "tool.default.tips.2": "Semua pemrosesan terjadi secara lokal untuk privasi maksimal.",
    "tool.default.tips.3": "Gunakan penamaan file kustom agar file tetap teratur.",

    "tool.organize.howto.1": "Klik 'Pilih File PDF' atau seret dan lepas dokumen Anda ke ruang kerja.",
    "tool.organize.howto.2": "Seret thumbnail halaman mana saja untuk menyusun ulangnya di dalam dokumen.",
    "tool.organize.howto.3": "Klik ikon tempat sampah pada halaman untuk menghapusnya sepenuhnya.",
    "tool.organize.howto.4": "Klik 'Simpan Perubahan' untuk menghasilkan PDF baru Anda.",
    "tool.organize.tips.1": "Anda dapat menggunakan Shift+Scroll untuk navigasi horizontal jika halamannya banyak.",
    "tool.organize.tips.2": "Halaman yang dihapus akan mengurangi ukuran file akhir.",
    "tool.organize.tips.3": "File asli tetap tidak berubah di perangkat Anda.",

    "tool.compress.howto.1": "Unggah dokumen PDF yang ingin Anda kompres.",
    "tool.compress.howto.2": "Pilih tingkat kompresi yang diinginkan (Maksimal, Seimbang, atau Rendah).",
    "tool.compress.howto.3": "Klik 'Kompres PDF' dan tunggu hingga proses selesai.",
    "tool.compress.tips.1": "Kompresi maksimal sangat baik untuk email tetapi akan mengurangi kualitas gambar.",
    "tool.compress.tips.2": "Mode seimbang disarankan untuk berbagi di web secara umum.",
    "tool.compress.tips.3": "Catatan: Kompresi akan meratakan PDF, sehingga teks menjadi gambar dan tidak dapat diblok.",

    "tool.ocr.howto.1": "Unggah PDF hasil scan atau gambar yang berisi teks.",
    "tool.ocr.howto.2": "Pilih bahasa yang ada di dokumen Anda untuk akurasi yang lebih baik.",
    "tool.ocr.howto.3": "Klik 'Ekstrak Teks' dan tunggu pengenalan karakter optik selesai.",
    "tool.ocr.tips.1": "Pastikan dokumen Anda terang dan memiliki kontras tinggi untuk hasil terbaik.",
    "tool.ocr.tips.2": "Anda dapat memilih lebih dari satu bahasa jika dokumen Anda multilingual.",
    "tool.ocr.tips.3": "Untuk PDF digital yang berisi gambar, centang opsi 'Paksa OCR Gambar'.",
`,
  es: `
    "workspace.how_to_use": "Cómo usar y consejos",
    "workspace.how_to_title": "Instrucciones para",
    "workspace.tips_title": "Consejos profesionales",

    "tool.default.howto.1": "Seleccione el archivo PDF que desea procesar.",
    "tool.default.howto.2": "Configure los parámetros en el panel de configuración.",
    "tool.default.howto.3": "Haga clic en el botón de acción para ejecutar la herramienta localmente.",
    "tool.default.tips.1": "Obtenga una vista previa de su resultado antes de descargar.",
    "tool.default.tips.2": "Todo el procesamiento ocurre localmente para máxima privacidad.",
    "tool.default.tips.3": "Use nombres de salida personalizados para mantener los archivos organizados.",

    "tool.organize.howto.1": "Haga clic en 'Seleccionar archivo PDF' o arrastre y suelte su documento.",
    "tool.organize.howto.2": "Arrastre cualquier miniatura de página para reordenarla.",
    "tool.organize.howto.3": "Haga clic en el icono de papelera para eliminarla por completo.",
    "tool.organize.howto.4": "Haga clic en 'Guardar cambios' para generar su nuevo PDF.",
    "tool.organize.tips.1": "Puede usar Shift+Scroll para navegar horizontalmente.",
    "tool.organize.tips.2": "Las páginas eliminadas reducirán el tamaño final del archivo.",
    "tool.organize.tips.3": "El archivo original permanece sin modificaciones en su dispositivo.",

    "tool.compress.howto.1": "Suba el documento PDF que desea comprimir.",
    "tool.compress.howto.2": "Seleccione el nivel de compresión deseado (Máxima, Equilibrada o Baja).",
    "tool.compress.howto.3": "Haga clic en 'Comprimir PDF' y espere a que termine el proceso.",
    "tool.compress.tips.1": "La compresión máxima es ideal para correos, pero reduce la calidad.",
    "tool.compress.tips.2": "El modo equilibrado se recomienda para compartir en la web.",
    "tool.compress.tips.3": "Nota: La compresión aplana el PDF, convirtiendo el texto en imágenes.",

    "tool.ocr.howto.1": "Suba un PDF escaneado o una imagen con texto.",
    "tool.ocr.howto.2": "Seleccione el idioma(s) de su documento para mayor precisión.",
    "tool.ocr.howto.3": "Haga clic en 'Extraer texto' y espere a que se complete el reconocimiento.",
    "tool.ocr.tips.1": "Asegúrese de que el documento tenga buen contraste para mejores resultados.",
    "tool.ocr.tips.2": "Puede seleccionar varios idiomas si su documento es multilingüe.",
    "tool.ocr.tips.3": "Para PDFs digitales con imágenes, marque 'Forzar OCR de imagen'.",
`,
  ja: `
    "workspace.how_to_use": "使い方とヒント",
    "workspace.how_to_title": "の手順",
    "workspace.tips_title": "プロのヒント",

    "tool.default.howto.1": "処理したいPDFファイルを選択します。",
    "tool.default.howto.2": "設定パネルでパラメータを設定します。",
    "tool.default.howto.3": "アクションボタンをクリックして、ローカルでツールを実行します。",
    "tool.default.tips.1": "ダウンロードする前に出力をプレビューしてください。",
    "tool.default.tips.2": "最大限のプライバシーのために、すべての処理はローカルで行われます。",
    "tool.default.tips.3": "ファイルを整理しておくために、カスタムの出力名を使用してください。",

    "tool.organize.howto.1": "「PDFファイルを選択」をクリックするか、ドキュメントをドラッグ＆ドロップします。",
    "tool.organize.howto.2": "ページのサムネイルをドラッグして並べ替えます。",
    "tool.organize.howto.3": "ゴミ箱アイコンをクリックすると、ページが完全に削除されます。",
    "tool.organize.howto.4": "「変更を保存」をクリックして、新しいPDFを生成します。",
    "tool.organize.tips.1": "Shift+スクロールを使用すると、水平方向に移動できます。",
    "tool.organize.tips.2": "削除されたページは、最終的なファイルサイズを小さくします。",
    "tool.organize.tips.3": "元のファイルはデバイス上で変更されません。",

    "tool.compress.howto.1": "圧縮したいPDFドキュメントをアップロードします。",
    "tool.compress.howto.2": "希望の圧縮レベル（最大、バランス、低）を選択します。",
    "tool.compress.howto.3": "「PDFを圧縮」をクリックしてプロセスが完了するのを待ちます。",
    "tool.compress.tips.1": "最大圧縮はメールに最適ですが、画質は低下します。",
    "tool.compress.tips.2": "バランスモードは、一般的なウェブ共有にお勧めします。",
    "tool.compress.tips.3": "注意：圧縮によりPDFがフラット化され、テキストが画像になります。",

    "tool.ocr.howto.1": "スキャンしたPDFまたはテキストを含む画像をアップロードします。",
    "tool.ocr.howto.2": "精度を高めるために、ドキュメントの言語を選択します。",
    "tool.ocr.howto.3": "「テキストを抽出」をクリックして完了するのを待ちます。",
    "tool.ocr.tips.1": "最良の結果を得るには、コントラストが高いことを確認してください。",
    "tool.ocr.tips.2": "多言語の場合は、複数の言語を選択できます。",
    "tool.ocr.tips.3": "画像を含むデジタルPDFの場合は、「画像OCRを強制」にチェックを入れます。",
`,
  pt: `
    "workspace.how_to_use": "Como Usar e Dicas",
    "workspace.how_to_title": "Instruções para",
    "workspace.tips_title": "Dicas Profissionais",

    "tool.default.howto.1": "Selecione o arquivo PDF que deseja processar.",
    "tool.default.howto.2": "Configure os parâmetros no painel de configurações.",
    "tool.default.howto.3": "Clique no botão de ação para executar a ferramenta localmente.",
    "tool.default.tips.1": "Visualize sua saída antes de fazer o download.",
    "tool.default.tips.2": "Todo o processamento ocorre localmente para máxima privacidade.",
    "tool.default.tips.3": "Use nomes de saída personalizados para manter os arquivos organizados.",

    "tool.organize.howto.1": "Clique em 'Selecionar Arquivo PDF' ou arraste e solte seu documento.",
    "tool.organize.howto.2": "Arraste qualquer miniatura de página para reordená-la.",
    "tool.organize.howto.3": "Clique no ícone de lixeira para removê-la completamente.",
    "tool.organize.howto.4": "Clique em 'Salvar Alterações' para gerar seu novo PDF.",
    "tool.organize.tips.1": "Você pode usar Shift+Scroll para navegar horizontalmente.",
    "tool.organize.tips.2": "As páginas removidas reduzirão o tamanho final do arquivo.",
    "tool.organize.tips.3": "O arquivo original permanece inalterado em seu dispositivo.",

    "tool.compress.howto.1": "Faça o upload do documento PDF que deseja comprimir.",
    "tool.compress.howto.2": "Selecione o nível de compressão desejado (Máxima, Equilibrada ou Baixa).",
    "tool.compress.howto.3": "Clique em 'Comprimir PDF' e aguarde o término do processo.",
    "tool.compress.tips.1": "A compressão máxima é ideal para e-mails, mas reduz a qualidade.",
    "tool.compress.tips.2": "O modo equilibrado é recomendado para compartilhamento na web.",
    "tool.compress.tips.3": "Nota: A compressão converte o PDF em imagens, o texto não será selecionável.",

    "tool.ocr.howto.1": "Faça o upload de um PDF digitalizado ou imagem com texto.",
    "tool.ocr.howto.2": "Selecione o idioma do seu documento para maior precisão.",
    "tool.ocr.howto.3": "Clique em 'Extrair Texto' e aguarde a conclusão.",
    "tool.ocr.tips.1": "Garanta que o documento tenha alto contraste para melhores resultados.",
    "tool.ocr.tips.2": "Você pode selecionar vários idiomas se o seu documento for multilíngue.",
    "tool.ocr.tips.3": "Para PDFs digitais com imagens, marque 'Forçar OCR de Imagem'.",
`,
  fr: `
    "workspace.how_to_use": "Comment utiliser & Astuces",
    "workspace.how_to_title": "Instructions pour",
    "workspace.tips_title": "Astuces de pro",

    "tool.default.howto.1": "Sélectionnez le fichier PDF que vous souhaitez traiter.",
    "tool.default.howto.2": "Configurez les paramètres dans le panneau de configuration.",
    "tool.default.howto.3": "Cliquez sur le bouton d'action pour exécuter l'outil localement.",
    "tool.default.tips.1": "Prévisualisez votre résultat avant de le télécharger.",
    "tool.default.tips.2": "Tout le traitement se fait localement pour une confidentialité maximale.",
    "tool.default.tips.3": "Utilisez des noms de sortie personnalisés pour garder vos fichiers organisés.",

    "tool.organize.howto.1": "Cliquez sur 'Sélectionner un fichier PDF' ou déposez votre document.",
    "tool.organize.howto.2": "Faites glisser n'importe quelle miniature de page pour la réorganiser.",
    "tool.organize.howto.3": "Cliquez sur l'icône de la corbeille pour la supprimer complètement.",
    "tool.organize.howto.4": "Cliquez sur 'Enregistrer les modifications' pour générer votre nouveau PDF.",
    "tool.organize.tips.1": "Vous pouvez utiliser Maj+Défilement pour naviguer horizontalement.",
    "tool.organize.tips.2": "Les pages supprimées réduiront la taille finale du fichier.",
    "tool.organize.tips.3": "Le fichier d'origine reste inchangé sur votre appareil.",

    "tool.compress.howto.1": "Téléchargez le document PDF que vous souhaitez compresser.",
    "tool.compress.howto.2": "Sélectionnez le niveau de compression souhaité (Maximum, Équilibré ou Faible).",
    "tool.compress.howto.3": "Cliquez sur 'Compresser PDF' et attendez la fin du processus.",
    "tool.compress.tips.1": "La compression maximale est idéale pour les e-mails, mais réduit la qualité.",
    "tool.compress.tips.2": "Le mode équilibré est recommandé pour le partage Web.",
    "tool.compress.tips.3": "Remarque : La compression convertit le PDF en images.",

    "tool.ocr.howto.1": "Téléchargez un PDF numérisé ou une image contenant du texte.",
    "tool.ocr.howto.2": "Sélectionnez la ou les langues de votre document pour plus de précision.",
    "tool.ocr.howto.3": "Cliquez sur 'Extraire le texte' et attendez la fin de la reconnaissance.",
    "tool.ocr.tips.1": "Assurez-vous que votre document a un contraste élevé pour de meilleurs résultats.",
    "tool.ocr.tips.2": "Vous pouvez sélectionner plusieurs langues si votre document est multilingue.",
    "tool.ocr.tips.3": "Pour les PDF numériques contenant des images, cochez 'Forcer l'OCR d'image'.",
`,
  de: `
    "workspace.how_to_use": "Verwendung & Tipps",
    "workspace.how_to_title": "Anweisungen für",
    "workspace.tips_title": "Profi-Tipps",

    "tool.default.howto.1": "Wählen Sie die zu verarbeitende PDF-Datei aus.",
    "tool.default.howto.2": "Konfigurieren Sie die Parameter im Einstellungsfeld.",
    "tool.default.howto.3": "Klicken Sie auf die Schaltfläche, um das Tool lokal auszuführen.",
    "tool.default.tips.1": "Zeigen Sie eine Vorschau Ihrer Ausgabe an, bevor Sie sie herunterladen.",
    "tool.default.tips.2": "Die gesamte Verarbeitung erfolgt lokal für maximale Privatsphäre.",
    "tool.default.tips.3": "Verwenden Sie benutzerdefinierte Ausgabenamen, um Dateien organisiert zu halten.",

    "tool.organize.howto.1": "Klicken Sie auf 'PDF-Datei auswählen' oder ziehen Sie Ihr Dokument hinein.",
    "tool.organize.howto.2": "Ziehen Sie eine Seitenminiatur, um sie neu anzuordnen.",
    "tool.organize.howto.3": "Klicken Sie auf das Papierkorb-Symbol, um sie vollständig zu entfernen.",
    "tool.organize.howto.4": "Klicken Sie auf 'Änderungen speichern', um Ihre neue PDF zu erstellen.",
    "tool.organize.tips.1": "Sie können Umschalt+Scrollen verwenden, um horizontal zu navigieren.",
    "tool.organize.tips.2": "Entfernte Seiten verringern die endgültige Dateigröße.",
    "tool.organize.tips.3": "Die Originaldatei bleibt auf Ihrem Gerät unverändert.",

    "tool.compress.howto.1": "Laden Sie das PDF-Dokument hoch, das Sie komprimieren möchten.",
    "tool.compress.howto.2": "Wählen Sie die gewünschte Kompressionsstufe (Maximal, Ausgewogen, Niedrig).",
    "tool.compress.howto.3": "Klicken Sie auf 'PDF komprimieren' und warten Sie auf den Abschluss.",
    "tool.compress.tips.1": "Die maximale Kompression ist ideal für E-Mails, mindert aber die Qualität.",
    "tool.compress.tips.2": "Der ausgewogene Modus wird für allgemeines Web-Sharing empfohlen.",
    "tool.compress.tips.3": "Hinweis: Durch die Komprimierung wird die PDF-Datei in Bilder umgewandelt.",

    "tool.ocr.howto.1": "Laden Sie eine gescannte PDF oder ein Bild mit Text hoch.",
    "tool.ocr.howto.2": "Wählen Sie die Sprache(n) Ihres Dokuments für eine bessere Genauigkeit.",
    "tool.ocr.howto.3": "Klicken Sie auf 'Text extrahieren' und warten Sie auf den Abschluss.",
    "tool.ocr.tips.1": "Sorgen Sie für einen hohen Kontrast für beste Ergebnisse.",
    "tool.ocr.tips.2": "Sie können mehrere Sprachen auswählen, wenn Ihr Dokument mehrsprachig ist.",
    "tool.ocr.tips.3": "Aktivieren Sie bei digitalen PDFs mit Bildern 'Bild-OCR erzwingen'.",
`
};

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

for (const [lang, additions] of Object.entries(data)) {
  // we add the translations to the beginning of the dictionary to be safe
  content = content.replace('  "' + lang + '": {', '  "' + lang + '": {\n' + additions);
}

fs.writeFileSync('src/data/translations.ts', content);
console.log('injected how-to tips properly!');
