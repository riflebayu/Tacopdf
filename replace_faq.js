const fs = require('fs');

const data = {
  "en": {
    "faq.2.a": "Yes, it is completely free with no hidden fees, no account registration required, no forced watermarks, and no daily file limits. To cover our server operational costs, we only display a few sponsored ads and accept voluntary donations from our users.",
    "faq.6.q": "Will donating give me access to premium features?",
    "faq.6.a": "No. TacoPDF is committed to providing all PDF tools for free to everyone without exception. Your donation is purely voluntary support so we can continue paying server costs and developing new features. There are no secret features locked behind a paywall.",
    "faq.7.q": "Is my donation payment data secure?",
    "faq.7.a": "Very secure. We use trusted third-party platforms, namely Saweria (for Indonesia) and Ko-Fi (International), as payment gateways. TacoPDF does not see, process, or store your credit card numbers or banking details on our servers at all."
  },
  "id": {
    "faq.2.a": "Ya, sepenuhnya gratis tanpa biaya tersembunyi, tanpa perlu mendaftar akun, tanpa watermark paksa, dan tanpa batasan jumlah file harian. Untuk menutupi biaya operasional peladen (server), kami hanya menampilkan sedikit iklan sponsor dan menerima dukungan berupa donasi sukarela dari pengguna.",
    "faq.6.q": "Apakah dengan berdonasi saya akan mendapatkan fitur premium?",
    "faq.6.a": "Tidak. TacoPDF berkomitmen untuk menyediakan semua alat PDF secara gratis untuk semua orang tanpa terkecuali. Donasi Anda murni bersifat dukungan sukarela agar kami bisa terus membayar biaya peladen dan mengembangkan fitur baru. Tidak ada fitur rahasia yang dikunci di balik pembayaran.",
    "faq.7.q": "Apakah data pembayaran donasi saya aman?",
    "faq.7.a": "Sangat aman. Kami menggunakan platform pihak ketiga yang terpercaya, yaitu Saweria (untuk Indonesia) dan Ko-Fi (Internasional), sebagai gerbang pembayaran. TacoPDF sama sekali tidak melihat, memproses, atau menyimpan nomor kartu kredit atau detail perbankan Anda di server kami."
  },
  "es": {
    "faq.2.a": "Sí, es completamente gratis sin costos ocultos, sin necesidad de registrar una cuenta, sin marcas de agua forzadas y sin límites diarios de archivos. Para cubrir los costos operativos del servidor, solo mostramos algunos anuncios patrocinados y aceptamos donaciones voluntarias de nuestros usuarios.",
    "faq.6.q": "¿Donar me dará acceso a funciones premium?",
    "faq.6.a": "No. TacoPDF se compromete a proporcionar todas las herramientas PDF de forma gratuita a todos sin excepción. Su donación es un apoyo puramente voluntario para que podamos seguir pagando los costos del servidor y desarrollando nuevas funciones. No hay funciones secretas bloqueadas tras un muro de pago.",
    "faq.7.q": "¿Están seguros mis datos de pago de donación?",
    "faq.7.a": "Muy seguros. Utilizamos plataformas de terceros de confianza, concretamente Saweria (para Indonesia) y Ko-Fi (Internacional), como pasarelas de pago. TacoPDF no ve, procesa ni almacena en absoluto sus números de tarjeta de crédito o datos bancarios en nuestros servidores."
  },
  "fr": {
    "faq.2.a": "Oui, c'est totalement gratuit sans frais cachés, sans inscription de compte requise, sans filigrane imposé et sans limite quotidienne de fichiers. Pour couvrir les coûts d'exploitation de nos serveurs, nous affichons uniquement quelques annonces sponsorisées et acceptons les dons volontaires de nos utilisateurs.",
    "faq.6.q": "Faire un don me donnera-t-il accès à des fonctionnalités premium ?",
    "faq.6.a": "Non. TacoPDF s'engage à fournir tous les outils PDF gratuitement à tout le monde sans exception. Votre don est un soutien purement volontaire afin que nous puissions continuer à payer les frais de serveur et à développer de nouvelles fonctionnalités. Il n'y a pas de fonctionnalités secrètes bloquées derrière un paiement.",
    "faq.7.q": "Mes données de paiement de don sont-elles sécurisées ?",
    "faq.7.a": "Très sécurisées. Nous utilisons des plateformes tierces de confiance, à savoir Saweria (pour l'Indonésie) et Ko-Fi (International), comme passerelles de paiement. TacoPDF ne voit, ne traite ni ne stocke en aucun cas vos numéros de carte de crédit ou vos coordonnées bancaires sur nos serveurs."
  },
  "de": {
    "faq.2.a": "Ja, es ist völlig kostenlos ohne versteckte Gebühren, ohne erforderliche Kontoregistrierung, ohne erzwungene Wasserzeichen und ohne tägliche Dateilimits. Um unsere Serverbetriebskosten zu decken, zeigen wir nur wenige gesponserte Anzeigen und akzeptieren freiwillige Spenden unserer Nutzer.",
    "faq.6.q": "Erhalte ich durch eine Spende Zugang zu Premium-Funktionen?",
    "faq.6.a": "Nein. TacoPDF verpflichtet sich, alle PDF-Tools für jeden ausnahmslos kostenlos zur Verfügung zu stellen. Ihre Spende ist eine rein freiwillige Unterstützung, damit wir weiterhin Serverkosten bezahlen und neue Funktionen entwickeln können. Es gibt keine geheimen Funktionen, die hinter einer Bezahlschranke verborgen sind.",
    "faq.7.q": "Sind meine Spendenzahlungsdaten sicher?",
    "faq.7.a": "Sehr sicher. Wir nutzen vertrauenswürdige Drittanbieter-Plattformen, nämlich Saweria (für Indonesien) und Ko-Fi (International), als Zahlungs-Gateways. TacoPDF sieht, verarbeitet oder speichert Ihre Kreditkartennummern oder Bankdaten in keiner Weise auf unseren Servern."
  },
  "pt": {
    "faq.2.a": "Sim, é totalmente gratuito sem taxas ocultas, sem necessidade de registro de conta, sem marcas d'água forçadas e sem limites diários de arquivos. Para cobrir os custos operacionais do nosso servidor, exibimos apenas alguns anúncios patrocinados e aceitamos doações voluntárias de nossos usuários.",
    "faq.6.q": "Fazer uma doação me dará acesso a recursos premium?",
    "faq.6.a": "Não. O TacoPDF está empenhado em fornecer todas as ferramentas PDF gratuitamente para todos, sem exceção. A sua doação é um apoio puramente voluntário para que possamos continuar pagando os custos do servidor e desenvolvendo novos recursos. Não há recursos secretos bloqueados por um paywall.",
    "faq.7.q": "Os meus dados de pagamento de doação estão seguros?",
    "faq.7.a": "Muito seguros. Usamos plataformas de terceiros confiáveis, nomeadamente Saweria (para a Indonésia) e Ko-Fi (Internacional), como gateways de pagamento. O TacoPDF não vê, processa ou armazena os seus números de cartão de crédito ou dados bancários em nossos servidores de forma alguma."
  },
  "ja": {
    "faq.2.a": "はい、隠れた費用、アカウント登録の必要性、強制的な透かし、および1日のファイル制限なしに完全に無料です。サーバーの運営費を賄うために、わずかなスポンサー広告を表示し、ユーザーからの任意の寄付を受け付けています。",
    "faq.6.q": "寄付をするとプレミアム機能にアクセスできますか？",
    "faq.6.a": "いいえ。TacoPDFは、例外なくすべての人にすべてのPDFツールを無料で提供することをお約束します。皆様からの寄付は、当社がサーバー費用を支払い、新機能を開発し続けるための純粋な任意の支援です。支払いの背後に隠された秘密の機能はありません。",
    "faq.7.q": "寄付の支払いデータは安全ですか？",
    "faq.7.a": "非常に安全です。当社は、支払いゲートウェイとして、信頼できるサードパーティのプラットフォームであるSaweria（インドネシア向け）およびKo-Fi（国際向け）を使用しています。TacoPDFが当社のサーバー上でお客様のクレジットカード番号や銀行の詳細を確認、処理、または保存することは一切ありません。"
  }
};

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

for (const [lang, translations] of Object.entries(data)) {
    const langKey = '"' + lang + '": {';
    let langStart = content.indexOf(langKey);
    if (langStart === -1) {
        console.log("Language not found: " + lang);
        continue;
    }
    
    // Find next language start
    let endLangIdx = content.indexOf('"\n  },', langStart);
    if (endLangIdx === -1) endLangIdx = content.indexOf('"\r\n  },', langStart);
    if (endLangIdx === -1) endLangIdx = content.length;
    
    let langSection = content.substring(langStart, endLangIdx);
    
    // Replace faq.2.a safely
    const faq2aRegex = /("faq\.2\.a":\s*")[^"]*(")/s;
    langSection = langSection.replace(faq2aRegex, `$1${translations["faq.2.a"]}$2`);
    
    // Replace faq.5.a using Regex to find the END of the string
    const faq5aRegex = /("faq\.5\.a":\s*")[^"]*(")/s;
    
    const insertStr = `$1$2,\n    "faq.6.q": "${translations["faq.6.q"]}",\n    "faq.6.a": "${translations["faq.6.a"]}",\n    "faq.7.q": "${translations["faq.7.q"]}",\n    "faq.7.a": "${translations["faq.7.a"]}"`;
    
    langSection = langSection.replace(faq5aRegex, function(match, p1, p2) {
        return match + `,\n    "faq.6.q": "${translations["faq.6.q"]}",\n    "faq.6.a": "${translations["faq.6.a"]}",\n    "faq.7.q": "${translations["faq.7.q"]}",\n    "faq.7.a": "${translations["faq.7.a"]}"`;
    });
    
    content = content.substring(0, langStart) + langSection + content.substring(endLangIdx);
    console.log("Processed " + lang);
}

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log("Done");
