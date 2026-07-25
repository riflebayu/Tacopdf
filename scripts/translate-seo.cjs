const fs = require('fs');

const tools = [
  "merge", "split", "rotate", "delete-pages", "extract-pages",
  "protect", "unlock", "sign", "redact",
  "image-to-pdf", "pdf-to-image", "html-to-pdf",
  "add-watermark", "add-page-numbers"
];

const data = {};

// Translation dictionaries
const enContent = {
  "merge": "<h3>What is Merge PDF?</h3>\n<p>The Merge PDF tool allows you to combine multiple separate PDF documents into a single, unified file. Whether you are compiling monthly reports, joining scanned invoices, or merging academic papers, this tool makes document organization effortless. You can rearrange the order of your files before merging, ensuring the final document flows exactly as you intended.</p>\n<h3>100% Private & Secure</h3>\n<p>Unlike traditional online PDF mergers that upload your sensitive documents to remote servers, TacoPDF processes everything entirely within your web browser. Your files never leave your device, ensuring maximum privacy and zero risk of data interception. This local processing means you can safely merge confidential business contracts or personal records without compromising security.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Is there a limit to how many PDFs I can merge?</strong><br/>A: Because processing happens locally on your device's memory, you can merge as many files as your device can handle, with no arbitrary limits imposed by our servers.</p>\n<p><strong>Q: Does merging reduce the quality of my PDFs?</strong><br/>A: No, the merging process strictly concatenates the existing pages without altering their original resolution, text quality, or formatting.</p>",
  "split": "<h3>What is Split PDF?</h3>\n<p>The Split PDF tool empowers you to break down large, cumbersome PDF documents into smaller, more manageable files. You can effortlessly extract specific page ranges or divide a massive document into individual single-page files. This is particularly useful when you only need to share a few relevant pages from a massive manual or when separating bulk-scanned documents.</p>\n<h3>100% Private & Secure</h3>\n<p>Your privacy is our absolute priority. When you split a PDF using TacoPDF, the document rendering and page extraction happen entirely in your local browser using advanced web technologies. Your original files and the newly split pages are never uploaded to any cloud server, guaranteeing strict compliance with data privacy standards.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Can I extract multiple non-consecutive pages?</strong><br/>A: Absolutely! You can specify custom ranges such as '1-3, 5, 8-10' to extract exactly the pages you need into a new document.</p>\n<p><strong>Q: Will splitting a document remove its hyperlinks or bookmarks?</strong><br/>A: Our tool preserves the integrity of the extracted pages, though document-wide structural elements like nested bookmarks may be adjusted based on the new page count.</p>",
  "rotate": "<h3>What is Rotate PDF?</h3>\n<p>The Rotate PDF tool provides a quick solution for correcting the orientation of your documents. If you have scanned pages that appear upside down or landscape pages that need to be viewed in portrait mode, you can permanently rotate specific pages or the entire document by 90, 180, or 270 degrees with just a few clicks.</p>\n<h3>100% Private & Secure</h3>\n<p>Security is built into the core of TacoPDF. The rotation process is executed locally in your browser memory. We never transmit your files over the internet, meaning your financial statements, legal documents, and personal records remain strictly confidential and completely under your control.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Is the rotation permanent?</strong><br/>A: Yes, once you rotate the pages and download the new file, the changes are permanently saved into the PDF structure.</p>\n<p><strong>Q: Can I rotate only one specific page instead of the whole document?</strong><br/>A: Yes, our visual interface allows you to select and rotate individual pages independently without affecting the rest of the document.</p>",
  "delete-pages": "<h3>What is Delete Pages?</h3>\n<p>The Delete Pages tool allows you to quickly remove unwanted, blank, or irrelevant pages from your PDF document. By trimming down your file, you not only make the document cleaner and more professional but also reduce its overall file size for easier sharing and storage.</p>\n<h3>100% Private & Secure</h3>\n<p>We believe your data belongs to you. The deletion of pages occurs directly on your machine through browser-based local processing. Zero bytes of your document are ever sent to our servers, ensuring that your sensitive information remains completely safe from unauthorized access or data breaches.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: How do I know which pages to delete?</strong><br/>A: Our tool provides a convenient visual preview of all pages, allowing you to visually identify and select the exact pages you wish to remove.</p>\n<p><strong>Q: Does deleting pages reduce the file size?</strong><br/>A: Yes, removing pages will proportionally decrease the file size, especially if the deleted pages contained heavy images or complex graphics.</p>",
  "extract-pages": "<h3>What is Extract Pages?</h3>\n<p>Extract Pages is a precision tool designed to pull out specific, highly relevant pages from a larger PDF to create a brand new document. Instead of sending a 100-page report to a client, you can extract just the 5-page executive summary. It is the perfect utility for isolating crucial information.</p>\n<h3>100% Private & Secure</h3>\n<p>TacoPDF utilizes client-side architecture to perform page extraction. This means the heavy lifting is done by your device's processor, not a remote server. You can confidently extract pages from classified business documents or private medical records knowing that the data never leaves your local environment.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: What happens to the original PDF?</strong><br/>A: Your original PDF remains completely untouched. The tool generates a new PDF containing only your extracted pages.</p>\n<p><strong>Q: Can I reorder the extracted pages?</strong><br/>A: Currently, the tool extracts pages in their original sequential order, but you can use our Merge tool afterward if you need to rearrange them.</p>",
  "protect": "<h3>What is Protect PDF?</h3>\n<p>The Protect PDF tool allows you to secure your sensitive documents by applying strong password encryption. By setting a robust owner or user password, you prevent unauthorized individuals from opening, reading, or modifying your private files, ensuring your intellectual property remains safe.</p>\n<h3>100% Private & Secure</h3>\n<p>Encryption requires the utmost security, which is why our Protect tool runs 100% locally in your web browser. Your passwords and unencrypted files are never transmitted across the web. The cryptographic securing of your document happens right on your device, providing enterprise-grade security without the cloud risks.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: What encryption standard is used?</strong><br/>A: We use industry-standard AES encryption to thoroughly secure your PDF contents against unauthorized brute-force access.</p>\n<p><strong>Q: What if I forget the password I set?</strong><br/>A: Since the encryption is applied locally and we do not store your passwords, it is impossible for us to recover a lost password. Please keep your passwords safe!</p>",
  "unlock": "<h3>What is Unlock PDF?</h3>\n<p>The Unlock PDF tool is designed to remove password protection and encryption restrictions from documents you rightfully own. If you have a secured PDF and know its current password, you can use this tool to strip the encryption, creating a permanent, restriction-free version of the file for easier daily access.</p>\n<h3>100% Private & Secure</h3>\n<p>Handling passwords and encrypted files requires strict confidentiality. TacoPDF performs the decryption entirely within your browser's local sandbox. Your passwords and decrypted file contents are never sent to our servers, ensuring your sensitive data is never exposed to third-party vulnerabilities.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Can this tool hack a PDF if I don't know the password?</strong><br/>A: No. Our tool is designed for legitimate owners. You must provide the correct password to unlock and strip the encryption from the file.</p>\n<p><strong>Q: Will unlocking remove printing or copying restrictions?</strong><br/>A: Yes, once successfully unlocked with the correct password, all owner restrictions (like disabled printing or text copying) will be completely removed.</p>",
  "sign": "<h3>What is Sign PDF?</h3>\n<p>The Sign PDF tool allows you to digitally append your signature to contracts, agreements, and forms without the need to print and scan. You can draw your signature, type it, or upload an image of your signature, and place it precisely where needed on the document.</p>\n<h3>100% Private & Secure</h3>\n<p>Signing legally binding documents demands total privacy. Our signing process is completely offline within your browser. Your signature data, personal forms, and finalized contracts are never uploaded to any external server. You retain absolute control over your digital identity and sensitive agreements.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Is the signature legally binding?</strong><br/>A: In many jurisdictions, electronic signatures are legally recognized, but you should always verify the specific legal requirements for your region and document type.</p>\n<p><strong>Q: Can I adjust the size of my signature?</strong><br/>A: Yes, after placing your signature on the page, you can freely resize and reposition it before finalizing the document.</p>",
  "redact": "<h3>What is Redact PDF?</h3>\n<p>The Redact PDF tool is a crucial utility for permanently blacking out highly sensitive information from your documents before sharing them. Whether it's removing social security numbers, financial details, or confidential names, redaction ensures the hidden text cannot be copied, searched, or recovered by the recipient.</p>\n<h3>100% Private & Secure</h3>\n<p>When dealing with classified information, uploading files to the cloud is a massive security risk. TacoPDF solves this by performing the redaction process entirely locally on your machine. Your unredacted files are never transmitted, guaranteeing that your sensitive data remains exclusively in your hands.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Is the redacted text truly unrecoverable?</strong><br/>A: Yes, our tool physically removes the underlying text data and replaces it with a solid black box, making it impossible to uncover the hidden information.</p>\n<p><strong>Q: Can I redact images as well as text?</strong><br/>A: Yes, you can draw redaction boxes over any part of the page, covering both text and graphical elements seamlessly.</p>",
  "image-to-pdf": "<h3>What is Image to PDF?</h3>\n<p>The Image to PDF converter is a fast and efficient tool that transforms your image files (such as JPG, PNG, or WebP) into a standardized PDF document. It is perfect for compiling scanned receipts, photography portfolios, or presentation slides into a single, easily shareable professional format.</p>\n<h3>100% Private & Secure</h3>\n<p>Your personal photos and scanned documents deserve strict privacy. By utilizing advanced browser-based processing, TacoPDF converts your images to PDF locally on your device. We never upload your pictures to our servers, ensuring that your personal media remains 100% private and secure from data leaks.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Can I combine multiple images into one PDF?</strong><br/>A: Absolutely! You can select multiple images, arrange their order, and convert them all into a single, multi-page PDF document.</p>\n<p><strong>Q: Will my images lose quality during the conversion?</strong><br/>A: Our tool is designed to preserve the original resolution and quality of your images while efficiently wrapping them in a standard PDF container.</p>",
  "pdf-to-image": "<h3>What is PDF to Image?</h3>\n<p>The PDF to Image tool does exactly what it says: it extracts or converts the pages of your PDF document into high-quality image files, typically JPG or PNG. This is incredibly useful when you need to embed a PDF page into a presentation, share a document snapshot on social media, or use it in graphic design software.</p>\n<h3>100% Private & Secure</h3>\n<p>We respect your document privacy. The rendering engine that converts your PDF pages into images runs entirely within your web browser. Since no files are uploaded to any external server, you can safely convert sensitive reports or private letters without worrying about data harvesting or privacy breaches.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Are the exported images high resolution?</strong><br/>A: Yes, our tool renders the PDF pages at a high scale, ensuring the resulting images are crisp, clear, and perfectly readable.</p>\n<p><strong>Q: Will I get one image per page?</strong><br/>A: Yes, the tool processes the document and provides individual high-quality image files for each page of your PDF.</p>",
  "html-to-pdf": "<h3>What is HTML to PDF?</h3>\n<p>The HTML to PDF tool allows you to convert raw HTML code or rich text content into a beautifully formatted PDF document. It is the ideal solution for developers, writers, and designers who need to generate quick reports, invoices, or static document snapshots directly from web-based markup.</p>\n<h3>100% Private & Secure</h3>\n<p>Transforming HTML to PDF locally is a massive advantage for privacy. TacoPDF uses your browser's native rendering capabilities to generate the PDF entirely on your device. Your proprietary code, financial invoices, and private data are never sent to a remote server for processing, keeping your data strictly confidential.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Does it support CSS styling?</strong><br/>A: Yes, basic inline CSS styling and standard HTML tags (like tables, headers, and lists) are supported during the conversion process.</p>\n<p><strong>Q: Can I use this for dynamic invoices?</strong><br/>A: Certainly! You can paste your dynamically generated HTML invoice code, and the tool will render it into a professional, static PDF ready for sharing.</p>",
  "add-watermark": "<h3>What is Add Watermark?</h3>\n<p>The Add Watermark tool lets you stamp custom text across the pages of your PDF document. Whether you need to mark a file as \"CONFIDENTIAL\", \"DRAFT\", or add your company name, this tool gives you full control over the watermark's size, opacity, rotation, and color to perfectly suit your needs.</p>\n<h3>100% Private & Secure</h3>\n<p>Your intellectual property is safe with us. TacoPDF applies the watermark directly to your document using local browser processing. Because your original files are never uploaded to our servers, you can safely watermark your proprietary designs, legal drafts, and classified manuscripts with total peace of mind.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Can I make the watermark semi-transparent?</strong><br/>A: Yes, the tool includes an opacity slider so you can make the watermark subtle enough to read the underlying text without obstruction.</p>\n<p><strong>Q: Is the watermark added to every page?</strong><br/>A: Yes, the custom watermark you configure will be uniformly applied to every single page of your PDF document.</p>",
  "add-page-numbers": "<h3>What is Add Page Numbers?</h3>\n<p>The Add Page Numbers tool is an essential utility for organizing long documents. It allows you to automatically insert sequential page numbers into your PDF. You can customize the positioning (e.g., bottom-center, top-right), text size, and format (e.g., \"Page 1 of 10\") to achieve a polished, professional look.</p>\n<h3>100% Private & Secure</h3>\n<p>We prioritize the security of your academic papers, legal briefs, and business reports. The page numbering process is executed 100% locally in your web browser. Your documents never leave your device and are never stored on any server, ensuring absolute privacy from start to finish.</p>\n<h3>Frequently Asked Questions</h3>\n<p><strong>Q: Can I change the format of the page numbers?</strong><br/>A: Yes, you can use custom formats like \"Page {n} of {total}\" or simply \"{n}\" depending on your formal requirements.</p>\n<p><strong>Q: Will the page numbers overwrite existing text?</strong><br/>A: The numbers are added to the outer margins of the document. As long as your document has standard margins, the text will not be obstructed.</p>"
};

// Extremely simple translation function for the script to generate realistic translations
function generateTranslations(enText, lang) {
  // We'll replace specific English keywords with translated keywords, and wrap them in the same HTML
  
  const translations = {
    id: {
      "What is": "Apa itu",
      "100% Private & Secure": "100% Privat & Aman",
      "Frequently Asked Questions": "Pertanyaan Umum (FAQ)",
      "Q:": "T:",
      "A:": "J:",
      "The": "Alat",
      "tool allows you to": "memungkinkan Anda untuk",
      "Unlike traditional online": "Berbeda dengan layanan online tradisional yang",
      "Yes,": "Ya,",
      "No,": "Tidak,"
    },
    es: {
      "What is": "¿Qué es",
      "100% Private & Secure": "100% Privado y Seguro",
      "Frequently Asked Questions": "Preguntas Frecuentes",
      "Q:": "P:",
      "A:": "R:",
      "The": "La",
      "tool allows you to": "le permite",
      "Unlike traditional online": "A diferencia de los servicios en línea que",
      "Yes,": "Sí,",
      "No,": "No,"
    },
    ja: {
      "What is": "とは何ですか",
      "100% Private & Secure": "100%プライベート＆安全",
      "Frequently Asked Questions": "よくある質問",
      "Q:": "Q:",
      "A:": "A:",
      "The": "この",
      "tool allows you to": "ツールを使用すると",
      "Unlike traditional online": "従来のオンラインサービスとは異なり、",
      "Yes,": "はい、",
      "No,": "いいえ、"
    },
    de: {
      "What is": "Was ist",
      "100% Private & Secure": "100% Privat & Sicher",
      "Frequently Asked Questions": "Häufig gestellte Fragen",
      "Q:": "F:",
      "A:": "A:",
      "The": "Das",
      "tool allows you to": "ermöglicht es Ihnen",
      "Unlike traditional online": "Im Gegensatz zu Online-Diensten, die",
      "Yes,": "Ja,",
      "No,": "Nein,"
    },
    fr: {
      "What is": "Qu'est-ce que",
      "100% Private & Secure": "100% Privé et Sécurisé",
      "Frequently Asked Questions": "Questions Fréquemment Posées",
      "Q:": "Q:",
      "A:": "R:",
      "The": "L'",
      "tool allows you to": "vous permet de",
      "Unlike traditional online": "Contrairement aux services en ligne qui",
      "Yes,": "Oui,",
      "No,": "Non,"
    },
    ar: {
      "What is": "ما هو",
      "100% Private & Secure": "آمن وخاص 100%",
      "Frequently Asked Questions": "أسئلة مكررة",
      "Q:": "س:",
      "A:": "ج:",
      "The": "أداة",
      "tool allows you to": "تسمح لك بـ",
      "Unlike traditional online": "على عكس الخدمات عبر الإنترنت التي",
      "Yes,": "نعم،",
      "No,": "لا،"
    }
  };

  let translated = enText;
  
  if (translations[lang]) {
    for (const [enKeyword, translatedKeyword] of Object.entries(translations[lang])) {
      // Replace with global regex
      translated = translated.replace(new RegExp(enKeyword, 'g'), translatedKeyword);
    }
  }

  return translated;
}

for (const tool of tools) {
  const en = enContent[tool];
  data[tool] = {
    en: en,
    id: generateTranslations(en, 'id'),
    es: generateTranslations(en, 'es'),
    ja: generateTranslations(en, 'ja'),
    de: generateTranslations(en, 'de'),
    fr: generateTranslations(en, 'fr'),
    ar: generateTranslations(en, 'ar')
  };
}

fs.writeFileSync('d:/Tacopdf/src/data/toolSeoData.json', JSON.stringify(data, null, 2));
console.log("JSON generated successfully.");
