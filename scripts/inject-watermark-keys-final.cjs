const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

if (!file.includes('"tool.watermark.text"')) {
  file = file.replace(/(\s+)"workspace.file.remove": "Remove PDF",?\s+\},/g, '$1"workspace.file.remove": "Remove PDF",\n    "tool.watermark.text": "Watermark Text",\n    "workspace.btn.save_download": "Save & Download PDF",\n    "tool.watermark.reset": "Reset Default"\n  },');
  file = file.replace(/(\s+)"workspace.file.remove": "Hapus PDF",?\s+\},/g, '$1"workspace.file.remove": "Hapus PDF",\n    "tool.watermark.text": "Teks Watermark",\n    "workspace.btn.save_download": "Simpan & Unduh PDF",\n    "tool.watermark.reset": "Atur Ulang"\n  },');
  file = file.replace(/(\s+)"workspace.file.remove": "Eliminar PDF",?\s+\},/g, '$1"workspace.file.remove": "Eliminar PDF",\n    "tool.watermark.text": "Texto de Marca de Agua",\n    "workspace.btn.save_download": "Guardar y Descargar PDF",\n    "tool.watermark.reset": "Restablecer"\n  },');
  file = file.replace(/(\s+)"workspace.file.remove": "पीडीएफ हटाएं",?\s+\},/g, '$1"workspace.file.remove": "पीडीएफ हटाएं",\n    "tool.watermark.text": "वाटरमार्क टेक्स्ट",\n    "workspace.btn.save_download": "सहेजें और पीडीएफ डाउनलोड करें",\n    "tool.watermark.reset": "रीसेट"\n  },');
  file = file.replace(/(\s+)"workspace.file.remove": "إزالة PDF",?\s+\},/g, '$1"workspace.file.remove": "إزالة PDF",\n    "tool.watermark.text": "نص العلامة المائية",\n    "workspace.btn.save_download": "حفظ وتنزيل PDF",\n    "tool.watermark.reset": "إعادة تعيين"\n  },');
  file = file.replace(/(\s+)"workspace.file.remove": "删除 PDF",?\s+\},/g, '$1"workspace.file.remove": "删除 PDF",\n    "tool.watermark.text": "水印文本",\n    "workspace.btn.save_download": "保存并下载 PDF",\n    "tool.watermark.reset": "重置"\n  },');
  
  // For `ja` (which was Japanese, I didn't inject `workspace.file.remove` for `ja` properly before, wait)
  // Let me just inject right before `  },` or `  }` for each block if not replaced yet.
  
  // Actually, wait, let me just append it directly into `en`, `id` and so on.
  file = file.replace(/(\s+)"workspace.file.remove": "[^"]*",?\s+\}(,|\s*\n)/g, (match, space, end) => {
     return match.replace(/}(,|\s*\n)/, `  "tool.watermark.text": "Watermark Text",\n  "workspace.btn.save_download": "Save & Download PDF",\n  "tool.watermark.reset": "Reset Default"\n}${end}`);
  });
}

fs.writeFileSync('src/data/translations.ts', file);
console.log('Done replacement');
