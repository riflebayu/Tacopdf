const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = {
  en: `    "tool.add_watermark.howto.1": "Upload the PDF document you want to watermark.",
    "tool.add_watermark.howto.2": "Look at the live preview to instantly see how the watermark will look.",
    "tool.add_watermark.howto.3": "Use the settings panel to change the text, color, size, rotation, and opacity.",
    "tool.add_watermark.howto.4": "Click 'Save & Download PDF' to finalize your watermarked document.",
    "tool.add_watermark.tips.1": "Use a semi-transparent color (lower opacity) to ensure the original content remains readable.",
    "tool.add_watermark.tips.2": "A diagonal rotation (like 45°) is usually the hardest to remove and covers the page evenly.",
    "tool.add_watermark.tips.3": "For confidential documents, a bright red color is standard to immediately catch attention.",`,
  
  id: `    "tool.add_watermark.howto.1": "Unggah dokumen PDF yang ingin Anda beri watermark.",
    "tool.add_watermark.howto.2": "Lihat pratinjau langsung untuk melihat tampilan watermark.",
    "tool.add_watermark.howto.3": "Gunakan panel pengaturan untuk mengubah teks, warna, ukuran, rotasi, dan transparansi.",
    "tool.add_watermark.howto.4": "Klik 'Simpan & Unduh PDF' untuk menyimpan dokumen hasil Anda.",
    "tool.add_watermark.tips.1": "Gunakan warna semi-transparan (opasitas rendah) agar teks asli tetap dapat dibaca.",
    "tool.add_watermark.tips.2": "Rotasi diagonal (seperti 45°) adalah yang paling sulit dihapus dan menutupi halaman secara merata.",
    "tool.add_watermark.tips.3": "Untuk dokumen rahasia, warna merah terang adalah standar untuk segera menarik perhatian.",`,
  
  es: `    "tool.add_watermark.howto.1": "Sube el documento PDF al que quieres añadir una marca de agua.",
    "tool.add_watermark.howto.2": "Mira la vista previa en vivo para ver cómo se verá la marca de agua al instante.",
    "tool.add_watermark.howto.3": "Usa el panel de configuración para cambiar el texto, color, tamaño, rotación y opacidad.",
    "tool.add_watermark.howto.4": "Haz clic en 'Guardar y Descargar PDF' para finalizar el documento.",
    "tool.add_watermark.tips.1": "Usa un color semitransparente (baja opacidad) para asegurar que el contenido original siga siendo legible.",
    "tool.add_watermark.tips.2": "Una rotación diagonal (como 45°) suele ser la más difícil de eliminar y cubre la página de manera uniforme.",
    "tool.add_watermark.tips.3": "Para documentos confidenciales, el color rojo brillante es el estándar para llamar la atención de inmediato.",`,

  hi: `    "tool.add_watermark.howto.1": "वह पीडीएफ दस्तावेज़ अपलोड करें जिसे आप वाटरमार्क करना चाहते हैं।",
    "tool.add_watermark.howto.2": "वाटरमार्क कैसा दिखेगा, यह तुरंत देखने के लिए लाइव प्रीव्यू देखें।",
    "tool.add_watermark.howto.3": "टेक्स्ट, रंग, आकार, घुमाव और अस्पष्टता को बदलने के लिए सेटिंग्स पैनल का उपयोग करें।",
    "tool.add_watermark.howto.4": "अपने वाटरमार्क किए गए दस्तावेज़ को अंतिम रूप देने के लिए 'सहेजें और पीडीएफ डाउनलोड करें' पर क्लिक करें।",
    "tool.add_watermark.tips.1": "मूल सामग्री को पठनीय सुनिश्चित करने के लिए अर्ध-पारदर्शी रंग (कम अस्पष्टता) का उपयोग करें।",
    "tool.add_watermark.tips.2": "एक विकर्ण घुमाव (जैसे 45°) आमतौर पर हटाने में सबसे कठिन होता है और पृष्ठ को समान रूप से कवर करता है।",
    "tool.add_watermark.tips.3": "गोपनीय दस्तावेजों के लिए, तुरंत ध्यान आकर्षित करने के लिए एक चमकीला लाल रंग मानक है।",`,
    
  ja: `    "tool.add_watermark.howto.1": "透かしを追加したいPDFドキュメントをアップロードします。",
    "tool.add_watermark.howto.2": "ライブプレビューを見て、透かしがどのように見えるかを即座に確認します。",
    "tool.add_watermark.howto.3": "設定パネルを使用して、テキスト、色、サイズ、回転、不透明度を変更します。",
    "tool.add_watermark.howto.4": "「保存してPDFをダウンロード」をクリックして、ドキュメントを完成させます。",
    "tool.add_watermark.tips.1": "元のコンテンツが読みやすいように、半透明の色（低い不透明度）を使用してください。",
    "tool.add_watermark.tips.2": "斜めの回転（45°など）は通常、最も取り除きにくく、ページを均等にカバーします。",
    "tool.add_watermark.tips.3": "機密文書の場合、明るい赤色がすぐに注意を引くための標準です。",`,
    
  ar: `    "tool.add_watermark.howto.1": "قم بتحميل مستند PDF الذي تريد وضع علامة مائية عليه.",
    "tool.add_watermark.howto.2": "انظر إلى المعاينة المباشرة لترى على الفور كيف ستبدو العلامة المائية.",
    "tool.add_watermark.howto.3": "استخدم لوحة الإعدادات لتغيير النص واللون والحجم والدوران والشفافية.",
    "tool.add_watermark.howto.4": "انقر على 'حفظ وتنزيل PDF' لوضع اللمسات الأخيرة على المستند.",
    "tool.add_watermark.tips.1": "استخدم لونًا شبه شفاف (شفافية منخفضة) لضمان بقاء المحتوى الأصلي قابلاً للقراءة.",
    "tool.add_watermark.tips.2": "يُعد الدوران القطري (مثل 45 درجة) هو الأصعب عادةً في الإزالة ويغطي الصفحة بالتساوي.",
    "tool.add_watermark.tips.3": "بالنسبة للمستندات السرية، يُعد اللون الأحمر الساطع قياسيًا لجذب الانتباه على الفور.",`,

  pt: `    "tool.add_watermark.howto.1": "Faça o upload do documento PDF que você deseja marcar com marca d'água.",
    "tool.add_watermark.howto.2": "Veja a visualização ao vivo para conferir instantaneamente como a marca d'água ficará.",
    "tool.add_watermark.howto.3": "Use o painel de configurações para alterar o texto, cor, tamanho, rotação e opacidade.",
    "tool.add_watermark.howto.4": "Clique em 'Salvar e Baixar PDF' para finalizar seu documento.",
    "tool.add_watermark.tips.1": "Use uma cor semitransparente (baixa opacidade) para garantir que o conteúdo original permaneça legível.",
    "tool.add_watermark.tips.2": "Uma rotação diagonal (como 45°) geralmente é a mais difícil de remover e cobre a página de maneira uniforme.",
    "tool.add_watermark.tips.3": "Para documentos confidenciais, uma cor vermelha brilhante é o padrão para chamar a atenção imediatamente.",`,
    
  zh: `    "tool.add_watermark.howto.1": "上传您想要添加水印的 PDF 文档。",
    "tool.add_watermark.howto.2": "查看实时预览以即时了解水印的外观。",
    "tool.add_watermark.howto.3": "使用设置面板更改文本、颜色、大小、旋转和不透明度。",
    "tool.add_watermark.howto.4": "单击“保存并下载 PDF”以完成您的文档。",
    "tool.add_watermark.tips.1": "使用半透明颜色（较低的不透明度）以确保原始内容保持可读。",
    "tool.add_watermark.tips.2": "对角线旋转（如 45°）通常最难删除，并且均匀覆盖页面。",
    "tool.add_watermark.tips.3": "对于机密文档，亮红色是立即引起注意的标准。",`,
    
  de: `    "tool.add_watermark.howto.1": "Laden Sie das PDF-Dokument hoch, das Sie mit einem Wasserzeichen versehen möchten.",
    "tool.add_watermark.howto.2": "Schauen Sie sich die Live-Vorschau an, um sofort zu sehen, wie das Wasserzeichen aussehen wird.",
    "tool.add_watermark.howto.3": "Verwenden Sie das Einstellungsfeld, um Text, Farbe, Größe, Drehung und Deckkraft zu ändern.",
    "tool.add_watermark.howto.4": "Klicken Sie auf 'Speichern & PDF Herunterladen', um Ihr Dokument fertigzustellen.",
    "tool.add_watermark.tips.1": "Verwenden Sie eine halbtransparente Farbe (geringere Deckkraft), um sicherzustellen, dass der Originalinhalt lesbar bleibt.",
    "tool.add_watermark.tips.2": "Eine diagonale Drehung (wie 45°) ist normalerweise am schwersten zu entfernen und bedeckt die Seite gleichmäßig.",
    "tool.add_watermark.tips.3": "Für vertrauliche Dokumente ist ein leuchtend rotes Farbschema der Standard, um sofort Aufmerksamkeit zu erregen.",`,
    
  fr: `    "tool.add_watermark.howto.1": "Téléchargez le document PDF que vous souhaitez tatouer.",
    "tool.add_watermark.howto.2": "Regardez l'aperçu en direct pour voir instantanément à quoi ressemblera le filigrane.",
    "tool.add_watermark.howto.3": "Utilisez le panneau des paramètres pour modifier le texte, la couleur, la taille, la rotation et l'opacité.",
    "tool.add_watermark.howto.4": "Cliquez sur 'Enregistrer et Télécharger PDF' pour finaliser votre document.",
    "tool.add_watermark.tips.1": "Utilisez une couleur semi-transparente (opacité plus faible) pour vous assurer que le contenu original reste lisible.",
    "tool.add_watermark.tips.2": "Une rotation en diagonale (comme 45°) est généralement la plus difficile à supprimer et couvre la page uniformément.",
    "tool.add_watermark.tips.3": "Pour les documents confidentiels, une couleur rouge vif est la norme pour attirer immédiatement l'attention.",`
};

let currentLang = '';
let lines = file.split('\\n');
let newLines = [];
let insertedForLang = {};

for (let i = 0; i < lines.length; i++) {
  newLines.push(lines[i]);
  const langMatch = lines[i].match(/^  ([a-z]{2}): \{/);
  if (langMatch) {
    currentLang = langMatch[1];
  }
  // Inject right after tool.watermark.reset to keep them grouped
  if (lines[i].includes('"tool.watermark.reset"') && currentLang && !insertedForLang[currentLang]) {
    if (additions[currentLang]) {
      newLines.push(additions[currentLang]);
      insertedForLang[currentLang] = true;
    }
  }
}

fs.writeFileSync('src/data/translations.ts', newLines.join('\\n'));
console.log('How To Tips translations added safely.');
