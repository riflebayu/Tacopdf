const fs = require('fs');
const path = require('path');

const seoTranslations = {
  ja: {
    "seo.header.title": "ゼロサーバーアップロードの究極の無料PDFツールキット",
    "seo.header.subtitle": "TacoPDF: 100%安全で高速、プライベートなブラウザベースのPDFエディタ",
    "seo.box1.title": "100%ローカル処理",
    "seo.box1.desc": "ドキュメントがインターネット経由で送信されたり、クラウドサーバーに保存されたりすることは決してありません。すべての処理はブラウザ内で直接実行されます。",
    "seo.box2.title": "WebAssemblyテクノロジー",
    "seo.box2.desc": "高性能なWebAssembly（Wasm）エンジンにより、非常に大きなPDFファイルでも瞬時に処理されます。",
    "seo.box3.title": "完全無料でオフライン対応",
    "seo.box3.desc": "毎日の使用制限なしで完全に無料です。ページを一度読み込むだけで、インターネット接続なしでオフラインで処理を続行できます。",
    "seo.secure.title": "セキュリティリスクのない安全なPDFドキュメント最適化",
    "seo.secure.p1": "一般的なオンラインコンバーターを使用すると、貴重なドキュメントをサードパーティのクラウドサーバーに委ねることになり、データ侵害のリスクにさらされます。",
    "seo.secure.p2": "<strong className=\"text-primary font-semibold\">TacoPDF</strong>は、ファイルが完全にあなたの手元に留まることを保証します。これは最も安全なドキュメント管理方法です。",
    "seo.features.title": "ドキュメントの生産性に合わせた優れた機能",
    "seo.privacy.title": "プライバシーポリシーとAdSenseコンプライアンス",
    "seo.privacy.p1": "TacoPDFは、ユーザーのプライバシーを尊重し保護することに厳格に取り組んでいます。あなたのファイルが当社のサーバーに触れることは決してありません。",
    "seo.privacy.p2": "<strong>サードパーティのCookieと広告ポリシー：</strong> Google AdSenseなどのネットワークを通じて、非侵入的なスポンサー広告を表示しています。",
    "seo.privacy.p3": "隠れた料金、強制的な登録、透かしは一切ないことを保証します。これは完全に無料のユーティリティです。",
    "seo.features.merge": "複数のレポートやスライドをシームレスに1つのPDFドキュメントに結合します。",
    "seo.features.split": "特定の重要なページを抽出して、新しいPDFドキュメントを瞬時に作成します。",
    "seo.features.rotate": "必要に応じて特定のページを正確に回転させることで、逆さまのスキャンを修正します。",
    "seo.features.protect": "安全な標準AESアルゴリズムを使用して、機密性の高いPDFファイルをローカルでロックおよび暗号化します。",
    "seo.features.unlock": "印刷や共有を容易にするために、ドキュメントからパスワードを削除します。",
    "seo.features.image_to_pdf": "PNG、JPG、JPEG、WebP画像を即座に正式な印刷用PDFファイルに変換します。",
    "seo.features.pdf_to_image": "PDFの各ページを抽出して高品質な画像写真にレンダリングします。",
    "seo.features.delete_pages": "空白のページや不要なページをドキュメント構造からきれいに切り取ります。",
    "seo.features.extract_pages": "保持したいページだけを選び、軽量ファイルとして保存します。",
    "seo.features.add_watermark": "完全にカスタマイズ可能な斜めのテキストオーバーレイで、スキャンしたIDや下書きを保護します。",
    "seo.features.add_page_numbers": "カスタムの番号付け形式と動的なページ数をページにシームレスにスタンプします。",
  },
  de: {
    "seo.header.title": "Das ultimative kostenlose PDF-Toolkit ohne Server-Uploads",
    "seo.header.subtitle": "TacoPDF: 100% sicherer, schneller und privater browserbasierter PDF-Editor",
    "seo.box1.title": "100% lokale Verarbeitung",
    "seo.box1.desc": "Ihre Dokumente werden niemals über das Internet gesendet oder auf einem Cloud-Server gespeichert. Alle Prozesse werden direkt in Ihrem Browser ausgeführt.",
    "seo.box2.title": "WebAssembly-Technologie",
    "seo.box2.desc": "Angetrieben von leistungsstarken WebAssembly (Wasm)-Engines werden selbst extrem große PDF-Dateien in Millisekunden verarbeitet.",
    "seo.box3.title": "Völlig kostenlos & offline",
    "seo.box3.desc": "Völlig kostenlos und ohne tägliche Nutzungslimits. Laden Sie die Seite einmal und verarbeiten Sie Ihre PDFs offline ohne Internetverbindung weiter.",
    "seo.secure.title": "Sichere PDF-Optimierung ohne Sicherheitsrisiken",
    "seo.secure.p1": "Die Nutzung typischer Online-Konverter zwingt Sie dazu, Ihre Dokumente Drittanbieter-Cloud-Servern anzuvertrauen, was Sie Datenschutzrisiken aussetzt.",
    "seo.secure.p2": "<strong className=\"text-primary font-semibold\">TacoPDF</strong> garantiert, dass Ihre Dateien vollständig in Ihren Händen bleiben. Die sicherste Art, Dokumente zu verwalten.",
    "seo.features.title": "Hervorragende Funktionen für Ihre Produktivität",
    "seo.privacy.title": "Datenschutzrichtlinie und AdSense-Konformität",
    "seo.privacy.p1": "TacoPDF verpflichtet sich strikt, die Privatsphäre der Nutzer zu respektieren und zu schützen. Ihre Dateien berühren niemals unsere Server.",
    "seo.privacy.p2": "<strong>Cookie- & Werberichtlinie:</strong> Wir schalten unaufdringliche Werbung über Google AdSense, um die Betriebskosten zu decken.",
    "seo.privacy.p3": "Wir garantieren keine versteckten Gebühren, keine Zwangsregistrierungen und keine Wasserzeichen. Ein völlig kostenloses Tool.",
    "seo.features.merge": "Kombinieren Sie mehrere Berichte oder Folien nahtlos zu einem einzigen PDF-Dokument.",
    "seo.features.split": "Extrahieren Sie bestimmte wichtige Seiten, um im Handumdrehen ein neues PDF-Dokument zu erstellen.",
    "seo.features.rotate": "Korrigieren Sie auf den Kopf gestellte Scans, indem Sie bestimmte Seiten genau wie gewünscht drehen.",
    "seo.features.protect": "Sperren und verschlüsseln Sie sensible PDF-Dateien lokal mit sicheren, standardisierten AES-Algorithmen.",
    "seo.features.unlock": "Entfernen Sie Passwörter aus Ihren Dokumenten, um das Drucken und Teilen zu erleichtern.",
    "seo.features.image_to_pdf": "Konvertieren Sie PNG-, JPG-, JPEG- und WebP-Bilder sofort in formale druckfertige PDF-Dateien.",
    "seo.features.pdf_to_image": "Extrahieren und rendern Sie jede Seite Ihres PDFs als hochwertige Bildfotos.",
    "seo.features.delete_pages": "Schneiden Sie leere oder unerwünschte Seiten sauber aus Ihrer Dokumentstruktur heraus.",
    "seo.features.extract_pages": "Wählen Sie nur die Seiten aus, die Sie behalten möchten, und speichern Sie sie als leichte Datei.",
    "seo.features.add_watermark": "Sichern Sie gescannte Ausweise oder Entwürfe mit vollständig anpassbaren diagonalen Textüberlagerungen.",
    "seo.features.add_page_numbers": "Stempeln Sie nahtlos benutzerdefinierte Nummerierungsformate und dynamische Seitenzahlen auf Ihre Seiten.",
  },
  fr: {
    "seo.header.title": "La boîte à outils PDF gratuite ultime sans téléchargement sur serveur",
    "seo.header.subtitle": "TacoPDF : Éditeur PDF basé sur un navigateur 100 % sécurisé, rapide et privé",
    "seo.box1.title": "Traitement 100 % local",
    "seo.box1.desc": "Vos documents ne sont jamais envoyés sur Internet ou stockés sur un serveur cloud. Tous les processus s'exécutent directement dans votre navigateur.",
    "seo.box2.title": "Technologie WebAssembly",
    "seo.box2.desc": "Propulsé par des moteurs WebAssembly (Wasm) hautes performances, même les fichiers PDF volumineux sont traités instantanément en millisecondes.",
    "seo.box3.title": "Entièrement gratuit et hors ligne",
    "seo.box3.desc": "Entièrement gratuit sans limite d'utilisation quotidienne. Chargez la page une fois et continuez à traiter vos PDF hors ligne.",
    "seo.secure.title": "Optimisation sécurisée des PDF sans aucun risque",
    "seo.secure.p1": "L'utilisation de convertisseurs en ligne classiques vous oblige à confier vos documents à des serveurs cloud tiers, vous exposant à des vulnérabilités.",
    "seo.secure.p2": "<strong className=\"text-primary font-semibold\">TacoPDF</strong> garantit que vos fichiers restent complètement entre vos mains. La manière la plus sûre de gérer les documents.",
    "seo.features.title": "Des fonctionnalités exceptionnelles adaptées à votre productivité",
    "seo.privacy.title": "Politique de confidentialité et conformité AdSense",
    "seo.privacy.p1": "TacoPDF s'engage strictement à respecter et à protéger la confidentialité des utilisateurs. Vos fichiers ne touchent jamais nos serveurs.",
    "seo.privacy.p2": "<strong>Politique relative aux cookies et à la publicité :</strong> Nous affichons des publicités non intrusives via Google AdSense pour compenser les coûts.",
    "seo.privacy.p3": "Nous garantissons aucun frais caché, aucune inscription forcée et aucun filigrane. Un utilitaire entièrement gratuit.",
    "seo.features.merge": "Combinez en toute transparence plusieurs rapports ou diapositives en un seul document PDF.",
    "seo.features.split": "Extrayez des pages cruciales spécifiques pour créer un nouveau document PDF en un instant.",
    "seo.features.rotate": "Corrigez les numérisations à l'envers en faisant pivoter des pages spécifiques exactement comme nécessaire.",
    "seo.features.protect": "Verrouillez et chiffrez les fichiers PDF sensibles localement à l'aide d'algorithmes AES standard sécurisés.",
    "seo.features.unlock": "Supprimez les mots de passe de vos propres documents pour une impression et un partage plus faciles.",
    "seo.features.image_to_pdf": "Convertissez instantanément des images PNG, JPG, JPEG et WebP en fichiers PDF formels prêts à imprimer.",
    "seo.features.pdf_to_image": "Extrayez et rendez chaque page de votre PDF en photos de haute qualité.",
    "seo.features.delete_pages": "Coupez proprement les pages vierges ou indésirables de la structure de votre document.",
    "seo.features.extract_pages": "Choisissez uniquement les pages que vous souhaitez conserver et enregistrez-les sous forme de fichier léger.",
    "seo.features.add_watermark": "Sécurisez les pièces d'identité ou les brouillons numérisés avec des superpositions de texte en diagonale personnalisables.",
    "seo.features.add_page_numbers": "Tamponnez de manière transparente des formats de numérotation personnalisés et un nombre de pages dynamique sur vos pages.",
  }
};

const additionalTranslations = {
  en: {
    "seo.features.html_to_pdf": "Instantly compile rich text and HTML directly into styled PDF documents completely locally.",
    "tool_name.merge": "Merge PDF",
    "tool_name.split": "Split PDF",
    "tool_name.rotate": "Rotate PDF",
    "tool_name.protect": "Protect PDF",
    "tool_name.unlock": "Unlock PDF",
    "tool_name.image_to_pdf": "Image to PDF",
    "tool_name.pdf_to_image": "PDF to Image",
    "tool_name.delete_pages": "Delete Pages",
    "tool_name.extract_pages": "Extract Pages",
    "tool_name.add_watermark": "Add Watermark",
    "tool_name.add_page_numbers": "Page Numbers",
    "tool_name.html_to_pdf": "HTML to PDF",
  },
  id: {
    "seo.features.html_to_pdf": "Kompilasi teks kaya (Rich Text) dan HTML secara instan menjadi dokumen PDF langsung dari browser Anda.",
    "tool_name.merge": "Gabung PDF",
    "tool_name.split": "Pisah PDF",
    "tool_name.rotate": "Putar PDF",
    "tool_name.protect": "Kunci PDF",
    "tool_name.unlock": "Buka Kunci PDF",
    "tool_name.image_to_pdf": "Gambar ke PDF",
    "tool_name.pdf_to_image": "PDF ke Gambar",
    "tool_name.delete_pages": "Hapus Halaman",
    "tool_name.extract_pages": "Ekstrak Halaman",
    "tool_name.add_watermark": "Tambah Watermark",
    "tool_name.add_page_numbers": "Nomor Halaman",
    "tool_name.html_to_pdf": "HTML ke PDF",
  },
  es: {
    "seo.features.html_to_pdf": "Compila instantáneamente texto enriquecido y HTML directamente en documentos PDF con estilo de forma local.",
    "tool_name.merge": "Unir PDF",
    "tool_name.split": "Dividir PDF",
    "tool_name.rotate": "Rotar PDF",
    "tool_name.protect": "Proteger PDF",
    "tool_name.unlock": "Desbloquear PDF",
    "tool_name.image_to_pdf": "Imagen a PDF",
    "tool_name.pdf_to_image": "PDF a Imagen",
    "tool_name.delete_pages": "Eliminar Páginas",
    "tool_name.extract_pages": "Extraer Páginas",
    "tool_name.add_watermark": "Añadir Marca de Agua",
    "tool_name.add_page_numbers": "Números de Página",
    "tool_name.html_to_pdf": "HTML a PDF",
  },
  ja: {
    "seo.features.html_to_pdf": "リッチテキストとHTMLをローカルで即座にスタイリッシュなPDFドキュメントにコンパイルします。",
    "tool_name.merge": "PDFの結合",
    "tool_name.split": "PDFの分割",
    "tool_name.rotate": "PDFの回転",
    "tool_name.protect": "PDFの保護",
    "tool_name.unlock": "PDFのロック解除",
    "tool_name.image_to_pdf": "画像からPDF",
    "tool_name.pdf_to_image": "PDFから画像",
    "tool_name.delete_pages": "ページの削除",
    "tool_name.extract_pages": "ページの抽出",
    "tool_name.add_watermark": "透かしの追加",
    "tool_name.add_page_numbers": "ページ番号",
    "tool_name.html_to_pdf": "HTMLからPDF",
  },
  pt: {
    "seo.features.html_to_pdf": "Compile instantaneamente texto rico e HTML diretamente em documentos PDF estilizados de forma local.",
    "tool_name.merge": "Juntar PDF",
    "tool_name.split": "Dividir PDF",
    "tool_name.rotate": "Rodar PDF",
    "tool_name.protect": "Proteger PDF",
    "tool_name.unlock": "Desbloquear PDF",
    "tool_name.image_to_pdf": "Imagem para PDF",
    "tool_name.pdf_to_image": "PDF para Imagem",
    "tool_name.delete_pages": "Eliminar Páginas",
    "tool_name.extract_pages": "Extrair Páginas",
    "tool_name.add_watermark": "Adicionar Marca d'água",
    "tool_name.add_page_numbers": "Números de Página",
    "tool_name.html_to_pdf": "HTML para PDF",
  },
  de: {
    "seo.features.html_to_pdf": "Kompilieren Sie Rich Text und HTML sofort vollständig lokal in gestaltete PDF-Dokumente.",
    "tool_name.merge": "PDF zusammenfügen",
    "tool_name.split": "PDF teilen",
    "tool_name.rotate": "PDF drehen",
    "tool_name.protect": "PDF schützen",
    "tool_name.unlock": "PDF entsperren",
    "tool_name.image_to_pdf": "Bild zu PDF",
    "tool_name.pdf_to_image": "PDF zu Bild",
    "tool_name.delete_pages": "Seiten löschen",
    "tool_name.extract_pages": "Seiten extrahieren",
    "tool_name.add_watermark": "Wasserzeichen",
    "tool_name.add_page_numbers": "Seitenzahlen",
    "tool_name.html_to_pdf": "HTML zu PDF",
  },
  fr: {
    "seo.features.html_to_pdf": "Compilez instantanément du texte enrichi et du HTML directement en documents PDF stylisés de manière entièrement locale.",
    "tool_name.merge": "Fusionner PDF",
    "tool_name.split": "Diviser PDF",
    "tool_name.rotate": "Pivoter PDF",
    "tool_name.protect": "Protéger PDF",
    "tool_name.unlock": "Déverrouiller PDF",
    "tool_name.image_to_pdf": "Image en PDF",
    "tool_name.pdf_to_image": "PDF en Image",
    "tool_name.delete_pages": "Supprimer des pages",
    "tool_name.extract_pages": "Extraire des pages",
    "tool_name.add_watermark": "Ajouter un filigrane",
    "tool_name.add_page_numbers": "Numéros de page",
    "tool_name.html_to_pdf": "HTML en PDF",
  }
};

const file = path.join(__dirname, 'src', 'data', 'translations.ts');
let content = fs.readFileSync(file, 'utf8');

// Inject seoTranslations for ja, de, fr
for (const lang of Object.keys(seoTranslations)) {
  const translations = seoTranslations[lang];
  let injected = '';
  for (const key of Object.keys(translations)) {
    injected += `    "${key}": ${JSON.stringify(translations[key])},\n`;
  }
  
  const langBlockStartRegex = new RegExp(`(${lang}:\\s*\\{)`);
  if (content.match(langBlockStartRegex)) {
    content = content.replace(langBlockStartRegex, `$1\n${injected}`);
  }
}

// Inject additionalTranslations for en, id, es, ja, pt, de, fr
for (const lang of Object.keys(additionalTranslations)) {
  const translations = additionalTranslations[lang];
  let injected = '';
  for (const key of Object.keys(translations)) {
    injected += `    "${key}": ${JSON.stringify(translations[key])},\n`;
  }
  
  const langBlockStartRegex = new RegExp(`(${lang}:\\s*\\{)`);
  if (content.match(langBlockStartRegex)) {
    content = content.replace(langBlockStartRegex, `$1\n${injected}`);
  }
}

fs.writeFileSync(file, content);
console.log('Successfully injected ALL missing translations for 7 languages.');
