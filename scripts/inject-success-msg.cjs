const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

if (!file.includes('"progress.success.add-watermark"')) {
  file = file.replace(/"tool\.watermark\.reset": "Reset Default"/g, '"tool.watermark.reset": "Reset Default",\n    "progress.success.add-watermark": "Watermark applied successfully!"');
  file = file.replace(/"tool\.watermark\.reset": "Atur Ulang"/g, '"tool.watermark.reset": "Atur Ulang",\n    "progress.success.add-watermark": "Watermark berhasil ditambahkan!"');
  file = file.replace(/"tool\.watermark\.reset": "Restablecer"/g, '"tool.watermark.reset": "Restablecer",\n    "progress.success.add-watermark": "¡Marca de agua aplicada con éxito!"');
  file = file.replace(/"tool\.watermark\.reset": "रीसेट"/g, '"tool.watermark.reset": "रीसेट",\n    "progress.success.add-watermark": "वाटरमार्क सफलतापूर्वक लागू किया गया!"');
  file = file.replace(/"tool\.watermark\.reset": "إعادة تعيين"/g, '"tool.watermark.reset": "إعادة تعيين",\n    "progress.success.add-watermark": "تم تطبيق العلامة المائية بنجاح!"');
  file = file.replace(/"tool\.watermark\.reset": "重置"/g, '"tool.watermark.reset": "重置",\n    "progress.success.add-watermark": "成功应用水印！"');
  file = file.replace(/"tool\.watermark\.reset": "Zurücksetzen"/g, '"tool.watermark.reset": "Zurücksetzen",\n    "progress.success.add-watermark": "Wasserzeichen erfolgreich angewendet!"');
  file = file.replace(/"tool\.watermark\.reset": "Réinitialiser"/g, '"tool.watermark.reset": "Réinitialiser",\n    "progress.success.add-watermark": "Filigrane appliqué avec succès !"');
  
  // For ja (Japanese)
  file = file.replace(/"tool\.watermark\.reset": "リセット"/g, '"tool.watermark.reset": "リセット",\n    "progress.success.add-watermark": "透かしが正常に適用されました！"');
  
  // For pt (Portuguese)
  file = file.replace(/"tool\.watermark\.reset": "Redefinir"/g, '"tool.watermark.reset": "Redefinir",\n    "progress.success.add-watermark": "Marca d\'água aplicada com sucesso!"');

  fs.writeFileSync('src/data/translations.ts', file);
  console.log('Progress success translations added.');
} else {
  console.log('Already added.');
}
