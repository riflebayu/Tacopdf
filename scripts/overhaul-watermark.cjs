const fs = require('fs');

let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const watermarkTranslations = {
  en: {
    "tool_name.add_watermark": "Add Watermark",
    "tool.watermark.text": "Watermark Text",
    "tool.watermark.placeholder": "CONFIDENTIAL",
    "tool.watermark.size": "Text Size",
    "tool.watermark.opacity": "Opacity (Transparency)",
    "tool.watermark.rotation": "Rotation Angle",
    "tool.watermark.color": "Text Color",
    "tool.watermark.reset": "Reset Default",
    "tool.add_watermark.instruction": "Upload a PDF and configure your watermark's text, size, color, and opacity using the settings below.",
    "tool.add_watermark.howto.1": "Upload the PDF document you want to stamp with a watermark.",
    "tool.add_watermark.howto.2": "Look at the live preview to instantly see how the watermark will appear.",
    "tool.add_watermark.howto.3": "Use the settings panel to change the text, color, size, rotation, and opacity.",
    "tool.add_watermark.howto.4": "Click 'Save & Download PDF' to finalize your watermarked document.",
    "tool.add_watermark.tips.1": "Use a semi-transparent color (lower opacity) to ensure the original content remains readable.",
    "tool.add_watermark.tips.2": "A diagonal rotation (like 45°) is usually the hardest to remove and covers the page evenly.",
    "tool.add_watermark.tips.3": "For confidential documents, a bright red color is standard to immediately catch attention.",
    "progress.success.add-watermark": "Watermark applied successfully!"
  },
  id: {
    "tool_name.add_watermark": "Tambah Watermark",
    "tool.watermark.text": "Teks Watermark",
    "tool.watermark.placeholder": "RAHASIA",
    "tool.watermark.size": "Ukuran Teks",
    "tool.watermark.opacity": "Transparansi (Opasitas)",
    "tool.watermark.rotation": "Sudut Kemiringan",
    "tool.watermark.color": "Warna Teks",
    "tool.watermark.reset": "Atur Ulang",
    "tool.add_watermark.instruction": "Unggah dokumen PDF dan atur teks, ukuran, warna, serta transparansi watermark menggunakan opsi di bawah.",
    "tool.add_watermark.howto.1": "Unggah dokumen PDF yang ingin Anda beri cap watermark.",
    "tool.add_watermark.howto.2": "Perhatikan layar pratinjau (live preview) untuk melihat hasil sementaranya.",
    "tool.add_watermark.howto.3": "Gunakan panel pengaturan untuk mengubah teks, ukuran, kemiringan, warna, dan transparansi.",
    "tool.add_watermark.howto.4": "Klik 'Simpan & Unduh PDF' untuk menyimpan dokumen hasil akhir Anda.",
    "tool.add_watermark.tips.1": "Gunakan tingkat transparansi yang rendah agar teks asli dokumen tetap dapat dibaca dengan jelas.",
    "tool.add_watermark.tips.2": "Kemiringan diagonal (misalnya 45°) adalah yang paling sulit dihapus dan mampu menutupi halaman secara merata.",
    "tool.add_watermark.tips.3": "Untuk dokumen yang bersifat rahasia, warna merah terang adalah standar terbaik untuk langsung menarik perhatian.",
    "progress.success.add-watermark": "Watermark berhasil ditambahkan!"
  },
  es: {
    "tool_name.add_watermark": "Añadir Marca de Agua",
    "tool.watermark.text": "Texto de Marca de Agua",
    "tool.watermark.placeholder": "CONFIDENCIAL",
    "tool.watermark.size": "Tamaño del Texto",
    "tool.watermark.opacity": "Transparencia (Opacidad)",
    "tool.watermark.rotation": "Ángulo de Inclinación",
    "tool.watermark.color": "Color del Texto",
    "tool.watermark.reset": "Restablecer",
    "tool.add_watermark.instruction": "Sube un PDF y configura el texto, tamaño, color y opacidad de tu marca de agua.",
    "tool.add_watermark.howto.1": "Sube el documento PDF al que quieres añadir una marca de agua.",
    "tool.add_watermark.howto.2": "Mira la vista previa en vivo para ver al instante cómo quedará.",
    "tool.add_watermark.howto.3": "Usa el panel de configuración para cambiar el texto, tamaño, ángulo, color y opacidad.",
    "tool.add_watermark.howto.4": "Haz clic en 'Guardar y Descargar PDF' para finalizar tu documento.",
    "tool.add_watermark.tips.1": "Usa un nivel bajo de opacidad para asegurar que el texto original siga siendo legible.",
    "tool.add_watermark.tips.2": "Una inclinación diagonal (como 45°) suele ser la más difícil de eliminar y cubre la página de manera uniforme.",
    "tool.add_watermark.tips.3": "Para documentos confidenciales, el color rojo brillante es el estándar para llamar la atención de inmediato.",
    "progress.success.add-watermark": "¡Marca de agua aplicada con éxito!"
  },
  ja: {
    "tool_name.add_watermark": "透かしを追加",
    "tool.watermark.text": "透かしのテキスト",
    "tool.watermark.placeholder": "社外秘",
    "tool.watermark.size": "テキストサイズ",
    "tool.watermark.opacity": "透明度（オパシティ）",
    "tool.watermark.rotation": "傾斜角（回転）",
    "tool.watermark.color": "テキストの色",
    "tool.watermark.reset": "初期設定に戻す",
    "tool.add_watermark.instruction": "PDFをアップロードし、下のオプションを使用して透かしのテキスト、サイズ、色、透明度を設定します。",
    "tool.add_watermark.howto.1": "透かしを追加したいPDFドキュメントをアップロードします。",
    "tool.add_watermark.howto.2": "ライブプレビューで透かしの仕上がりをすぐに確認できます。",
    "tool.add_watermark.howto.3": "設定パネルを使用して、テキスト、サイズ、傾斜角、色、透明度を変更します。",
    "tool.add_watermark.howto.4": "「保存してPDFをダウンロード」をクリックして、完成したドキュメントを保存します。",
    "tool.add_watermark.tips.1": "元のテキストが読みやすいように、透明度を低く（半透明に）設定してください。",
    "tool.add_watermark.tips.2": "対角線（45度など）の傾斜は最も取り除きにくく、ページ全体を均等にカバーします。",
    "tool.add_watermark.tips.3": "機密文書の場合、すぐに注意を引く明るい赤色が標準です。",
    "progress.success.add-watermark": "透かしが正常に適用されました！"
  },
  fr: {
    "tool_name.add_watermark": "Ajouter un Filigrane",
    "tool.watermark.text": "Texte du Filigrane",
    "tool.watermark.placeholder": "CONFIDENTIEL",
    "tool.watermark.size": "Taille du Texte",
    "tool.watermark.opacity": "Transparence (Opacité)",
    "tool.watermark.rotation": "Angle d'Inclinaison",
    "tool.watermark.color": "Couleur du Texte",
    "tool.watermark.reset": "Réinitialiser",
    "tool.add_watermark.instruction": "Téléchargez un PDF et configurez le texte, la taille, la couleur et l'opacité de votre filigrane.",
    "tool.add_watermark.howto.1": "Téléchargez le document PDF que vous souhaitez marquer d'un filigrane.",
    "tool.add_watermark.howto.2": "Regardez l'aperçu en direct pour voir instantanément à quoi il ressemblera.",
    "tool.add_watermark.howto.3": "Utilisez le panneau de configuration pour modifier le texte, la taille, l'angle, la couleur et l'opacité.",
    "tool.add_watermark.howto.4": "Cliquez sur 'Enregistrer et Télécharger PDF' pour finaliser votre document.",
    "tool.add_watermark.tips.1": "Utilisez un faible niveau d'opacité pour garantir que le texte d'origine reste lisible.",
    "tool.add_watermark.tips.2": "Une inclinaison diagonale (comme 45°) est la plus difficile à supprimer et couvre uniformément la page.",
    "tool.add_watermark.tips.3": "Pour les documents confidentiels, la couleur rouge vif est la norme pour attirer immédiatement l'attention.",
    "progress.success.add-watermark": "Filigrane appliqué avec succès !"
  },
  de: {
    "tool_name.add_watermark": "Wasserzeichen Hinzufügen",
    "tool.watermark.text": "Wasserzeichen-Text",
    "tool.watermark.placeholder": "VERTRAULICH",
    "tool.watermark.size": "Textgröße",
    "tool.watermark.opacity": "Transparenz (Deckkraft)",
    "tool.watermark.rotation": "Neigungswinkel",
    "tool.watermark.color": "Textfarbe",
    "tool.watermark.reset": "Zurücksetzen",
    "tool.add_watermark.instruction": "Laden Sie ein PDF hoch und konfigurieren Sie Text, Größe, Farbe und Deckkraft Ihres Wasserzeichens.",
    "tool.add_watermark.howto.1": "Laden Sie das PDF-Dokument hoch, das Sie mit einem Wasserzeichen versehen möchten.",
    "tool.add_watermark.howto.2": "Schauen Sie sich die Live-Vorschau an, um das Ergebnis sofort zu sehen.",
    "tool.add_watermark.howto.3": "Verwenden Sie die Einstellungen, um Text, Größe, Winkel, Farbe und Transparenz zu ändern.",
    "tool.add_watermark.howto.4": "Klicken Sie auf 'Speichern & PDF Herunterladen', um Ihr fertiges Dokument zu speichern.",
    "tool.add_watermark.tips.1": "Verwenden Sie eine hohe Transparenz (geringe Deckkraft), damit der Originaltext lesbar bleibt.",
    "tool.add_watermark.tips.2": "Ein diagonaler Winkel (z. B. 45°) lässt sich am schwersten entfernen und deckt die Seite gut ab.",
    "tool.add_watermark.tips.3": "Für vertrauliche Dokumente ist ein leuchtendes Rot der Standard, um sofort aufzufallen.",
    "progress.success.add-watermark": "Wasserzeichen erfolgreich angewendet!"
  },
  pt: {
    "tool_name.add_watermark": "Adicionar Marca d'Água",
    "tool.watermark.text": "Texto da Marca d'Água",
    "tool.watermark.placeholder": "CONFIDENCIAL",
    "tool.watermark.size": "Tamanho do Texto",
    "tool.watermark.opacity": "Transparência (Opacidade)",
    "tool.watermark.rotation": "Ângulo de Rotação",
    "tool.watermark.color": "Cor do Texto",
    "tool.watermark.reset": "Redefinir Padrão",
    "tool.add_watermark.instruction": "Faça upload de um PDF e configure o texto, tamanho, cor e opacidade da sua marca d'água.",
    "tool.add_watermark.howto.1": "Faça upload do documento PDF que você deseja marcar com uma marca d'água.",
    "tool.add_watermark.howto.2": "Observe a visualização ao vivo para ver instantaneamente como ficará.",
    "tool.add_watermark.howto.3": "Use o painel de configurações para alterar o texto, tamanho, ângulo, cor e opacidade.",
    "tool.add_watermark.howto.4": "Clique em 'Salvar e Baixar PDF' para finalizar seu documento.",
    "tool.add_watermark.tips.1": "Use uma baixa opacidade para garantir que o texto original permaneça legível.",
    "tool.add_watermark.tips.2": "Uma inclinação diagonal (como 45°) é a mais difícil de remover e cobre a página uniformemente.",
    "tool.add_watermark.tips.3": "Para documentos confidenciais, a cor vermelha brilhante é o padrão para atrair imediatamente a atenção.",
    "progress.success.add-watermark": "Marca d'água aplicada com sucesso!"
  }
};

// Map other languages to English just in case
watermarkTranslations['hi'] = watermarkTranslations['en'];
watermarkTranslations['ar'] = watermarkTranslations['en'];
watermarkTranslations['zh'] = watermarkTranslations['en'];

// Define all keys to be cleaned out
const keysToRemove = [
  "tool_name.add_watermark",
  "tool.watermark.text",
  "tool.watermark.placeholder",
  "tool.watermark.size",
  "tool.watermark.opacity",
  "tool.watermark.rotation",
  "tool.watermark.color",
  "tool.watermark.reset",
  "tool.add_watermark.instruction",
  "tool.add_watermark.howto.1",
  "tool.add_watermark.howto.2",
  "tool.add_watermark.howto.3",
  "tool.add_watermark.howto.4",
  "tool.add_watermark.tips.1",
  "tool.add_watermark.tips.2",
  "tool.add_watermark.tips.3",
  "progress.success.add-watermark",
  "tool.add-watermark.instruction"
];

let lines = file.split('\\n');
let newLines = [];
let currentLang = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detect language block
  const langMatch = line.match(/^  ([a-z]{2}): \{/);
  if (langMatch) {
    currentLang = langMatch[1];
  }
  
  // Skip if it contains any of the keys to remove
  const shouldRemove = keysToRemove.some(key => line.includes('"' + key + '"'));
  if (shouldRemove) {
    continue;
  }
  
  // If we reach the end of a language block, insert our translations BEFORE it
  if ((line === '  },' || line === '  }') && currentLang) {
    const trans = watermarkTranslations[currentLang] || watermarkTranslations['en'];
    
    // Ensure previous line has a comma
    if (newLines.length > 0 && !newLines[newLines.length - 1].endsWith(',') && !newLines[newLines.length - 1].endsWith('{')) {
      newLines[newLines.length - 1] += ',';
    }
    
    // Add translations
    const entries = Object.entries(trans);
    entries.forEach(([key, val], idx) => {
      newLines.push('    "' + key + '": "' + val + '"' + (idx < entries.length - 1 ? ',' : ''));
    });
    
    currentLang = ''; // reset so we don't insert twice
  }
  
  newLines.push(line);
}

fs.writeFileSync('src/data/translations.ts', newLines.join('\\n'));
console.log('Successfully completely overhauled watermark translations!');
