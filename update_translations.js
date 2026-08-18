const fs = require('fs');

const data = {
  'en': {
    'about.founder.text': 'Welcome! My name is Muhammad Bayu Edi from Central Java, Indonesia. The initial idea for creating TacoPDF was born purely out of personal experiences and challenges I often faced in my daily work routine.<br/><br/>While managing various data and documents, I always struggled to find an online PDF manipulation tool that was both practical and secure. Most existing services often limit file sizes, forcefully add watermarks, require account registration, or most alarmingly: silently upload our personal documents to their servers.<br/><br/>Stemming from this concern, I decided to build this solution. Prioritizing a clean and intuitive user interface (UI), I created TacoPDF—a document utility tool that is secure, fast, and reliable for anyone without frustrating limitations.',
    'about.p1.title': 'Why Use the Name \\\'TacoPDF\\\'?',
    'about.p1.text1': 'You might be wondering, why does an application from Indonesia use the name of a traditional Mexican food?',
    'about.p1.text2': 'A while ago, while visiting Jakarta, I had the opportunity to taste a Taco dish for the first time. I immediately loved it. A Taco is a food with a very simple concept and easy to hold, yet it has a very dense, flavorful, and satisfying filling.',
    'about.p1.text3': 'This philosophy is the main foundation of this website. I want TacoPDF to be a platform with a very simple and user-friendly visual appearance, but beneath that, possess complete and robust operational features to solve all your document management needs.',
    'about.p2.title': 'Top Priority on Privacy (100% Client Technology)',
    'about.p2.text1': 'For me, high productivity must not sacrifice data privacy.',
    'about.p2.text2': 'That is the main reason why TacoPDF is built using cutting-edge WebAssembly (WASM) technology. Thanks to this architecture, the entire process of merging, splitting, or converting documents occurs entirely within your browser\\\'s memory on your device.',
    'about.p2.text3': 'Your sensitive documents will never be uploaded, sent, or stored on our servers. As soon as the process is complete or the browser tab is closed, all data is automatically deleted from memory. What is processed on your device, will forever remain safely on your device.',
    'about.p3.title': 'Commitment to Free Service & Community Support',
    'about.p3.text1': 'TacoPDF is committed to providing professional-grade document tools for everyone, without charging expensive subscription fees. We maintain this platform to remain 100% free.',
    'about.p3.text2': 'To fund server operations and infrastructure maintenance, we rely on two things: the placement of sponsored ads designed not to disrupt your workspace, as well as voluntary donation support from our loyal users. Donations from the community greatly help TacoPDF to remain operating independently and free from user data selling practices.',
    'about.p4.title': 'Let\\\'s Connect!',
    'about.p4.text1': 'This platform is designed to simplify daily administrative tasks for students, freelancers, and professionals alike.',
    'about.p4.text2': 'If you have suggestions for adding new features, encounter technical issues (bugs), or just want to say hello, do not hesitate to send me a message through the <a href=\'/contact\' class=\'text-primary hover:underline font-bold\'>Contact Support</a> page.',
    'about.p4.text3': 'Thank you for entrusting your document management and security to TacoPDF. Work safely and productively!'
  },
  'es': {
    'about.founder.text': '¡Bienvenidos! Mi nombre es Muhammad Bayu Edi, de Java Central, Indonesia. La idea inicial de crear TacoPDF nació puramente de experiencias personales y desafíos que solía enfrentar en mi rutina de trabajo diaria.<br/><br/>Al gestionar varios datos y documentos, siempre me resultaba difícil encontrar una herramienta de manipulación de PDF en línea que fuera práctica y segura a la vez. La mayoría de los servicios existentes a menudo limitan el tamaño de los archivos, añaden marcas de agua a la fuerza, requieren el registro de una cuenta o, lo más alarmante: suben nuestros documentos personales a sus servidores en secreto.<br/><br/>A partir de esta preocupación, decidí construir esta solución. Priorizando una interfaz de usuario (UI) limpia e intuitiva, creé TacoPDF: una herramienta de utilidad de documentos que es segura, rápida y confiable para cualquier persona, sin limitaciones frustrantes.',
    'about.p1.title': '¿Por qué usar el nombre \\\'TacoPDF\\\'?',
    'about.p1.text1': 'Tal vez se pregunte, ¿por qué una aplicación de Indonesia usa el nombre de una comida tradicional mexicana?',
    'about.p1.text2': 'Hace un tiempo, mientras visitaba Yakarta, tuve la oportunidad de probar un plato de tacos por primera vez. Me encantó de inmediato. Un taco es una comida con un concepto muy simple y fácil de sostener, pero que tiene un relleno muy denso, sabroso y satisfactorio.',
    'about.p1.text3': 'Esta filosofía es la base principal de este sitio web. Quiero que TacoPDF sea una plataforma con una apariencia visual muy simple y fácil de usar, pero que, detrás de eso, posea funciones operativas completas y sólidas para resolver todas sus necesidades de gestión de documentos.',
    'about.p2.title': 'Máxima prioridad a la privacidad (Tecnología 100% del cliente)',
    'about.p2.text1': 'Para mí, la alta productividad no debe sacrificar la privacidad de los datos.',
    'about.p2.text2': 'Esa es la razón principal por la que TacoPDF está construido utilizando tecnología de vanguardia WebAssembly (WASM). Gracias a esta arquitectura, todo el proceso de fusión, división o conversión de documentos ocurre completamente dentro de la memoria del navegador en su dispositivo.',
    'about.p2.text3': 'Sus documentos confidenciales nunca serán subidos, enviados ni almacenados en nuestros servidores. Tan pronto como se completa el proceso o se cierra la pestaña del navegador, todos los datos se eliminan automáticamente de la memoria. Lo que se procesa en su dispositivo, permanecerá seguro para siempre en su dispositivo.',
    'about.p3.title': 'Compromiso con el servicio gratuito y apoyo de la comunidad',
    'about.p3.text1': 'TacoPDF se compromete a proporcionar herramientas de documentos de nivel profesional para todos, sin cobrar tarifas de suscripción costosas. Mantenemos esta plataforma para que siga siendo 100% gratuita.',
    'about.p3.text2': 'Para financiar las operaciones de los servidores y el mantenimiento de la infraestructura, dependemos de dos cosas: la colocación de anuncios patrocinados diseñados para no interrumpir su espacio de trabajo, así como el apoyo de donaciones voluntarias de nuestros fieles usuarios. Las donaciones de la comunidad ayudan enormemente a que TacoPDF siga operando de manera independiente y libre de prácticas de venta de datos de usuarios.',
    'about.p4.title': '¡Conectemos!',
    'about.p4.text1': 'Esta plataforma está diseñada para simplificar las tareas administrativas diarias de estudiantes, profesionales independientes (freelancers) y profesionales por igual.',
    'about.p4.text2': 'Si tiene sugerencias para agregar nuevas funciones, encuentra problemas técnicos (errores) o simplemente quiere saludar, no dude en enviarme un mensaje a través de la página de <a href=\'/contact\' class=\'text-primary hover:underline font-bold\'>Soporte</a>.',
    'about.p4.text3': 'Gracias por confiar la gestión y seguridad de sus documentos a TacoPDF. ¡Trabaje de forma segura y productiva!'
  },
  'ja': {
    'about.founder.text': 'ようこそ！私はインドネシアの中部ジャワ州出身のムハンマド・バユ・エディと申します。TacoPDFを作成した最初のアイデアは、私が日常業務で頻繁に直面していた個人的な経験と課題から純粋に生まれました。<br/><br/>様々なデータや文書を管理する中で、実用的かつ安全なオンラインPDF操作ツールを見つけるのにいつも苦労していました。既存のサービスの多くは、ファイルサイズを制限したり、強制的に透かしを追加したり、アカウント登録を要求したり、さらに最も懸念すべきことには、個人文書をこっそりと彼らのサーバーにアップロードしたりすることがよくあります。<br/><br/>こうした懸念から、私はこのソリューションを構築することにしました。クリーンで直感的なユーザーインターフェース（UI）を最優先し、面倒な制限なしに、誰にとっても安全で高速、かつ信頼性の高い文書ユーティリティツールであるTacoPDFを作成しました。',
    'about.p1.title': 'なぜ「TacoPDF」という名前なのか？',
    'about.p1.text1': 'インドネシアのアプリケーションがなぜメキシコの伝統料理の名前を使っているのか、疑問に思うかもしれません。',
    'about.p1.text2': '少し前、ジャカルタを訪れた際、初めてタコスを食べる機会がありました。私はすぐにそれが気に入りました。タコスは非常にシンプルなコンセプトで持ちやすい食べ物ですが、中身がぎっしり詰まっていて、風味が豊かで満足感があります。',
    'about.p1.text3': 'この哲学こそが、このウェブサイトの主な基盤です。私はTacoPDFを、視覚的には非常にシンプルで使いやすいプラットフォームでありながら、その裏にはあらゆる文書管理のニーズを解決するための完全で強力な操作機能を備えたものにしたいと考えています。',
    'about.p2.title': 'プライバシーへの最優先事項（100％クライアント技術）',
    'about.p2.text1': '私にとって、高い生産性のためにデータのプライバシーを犠牲にしてはなりません。',
    'about.p2.text2': 'それがTacoPDFが最先端のWebAssembly（WASM）技術を使用して構築されている主な理由です。このアーキテクチャのおかげで、文書の結合、分割、または変換の全プロセスは、お使いのデバイス上のブラウザメモリ内で完全に実行されます。',
    'about.p2.text3': 'お客様の機密文書が当社のサーバーにアップロード、送信、または保存されることは決してありません。プロセスが完了するか、ブラウザのタブが閉じられるとすぐに、すべてのデータは自動的にメモリから削除されます。お使いのデバイスで処理されたものは、永遠にそのデバイス内で安全に保たれます。',
    'about.p3.title': '無料サービスとコミュニティサポートへの取り組み',
    'about.p3.text1': 'TacoPDFは、高額なサブスクリプション料金を請求することなく、プロ仕様の文書ツールをすべての人に提供することをお約束します。私たちはこのプラットフォームを100％無料に維持します。',
    'about.p3.text2': 'サーバーの運用とインフラの保守資金を調達するために、私たちは2つのことに依存しています。ワークスペースを妨げないように設計されたスポンサー広告の配置と、忠実なユーザーからの自発的な寄付によるサポートです。コミュニティからの寄付は、TacoPDFが独立して運営され、ユーザーデータの販売などの慣行から自由であり続けるために大いに役立ちます。',
    'about.p4.title': '繋がりましょう！',
    'about.p4.text1': 'このプラットフォームは、学生、フリーランサー、専門家などの日常的な管理業務を簡素化するために設計されています。',
    'about.p4.text2': '新機能の追加に関する提案がある場合、技術的な問題（バグ）に遭遇した場合、または単に挨拶をしたい場合は、遠慮なく<a href=\'/contact\' class=\'text-primary hover:underline font-bold\'>サポートへのお問い合わせ</a>ページからメッセージを送信してください。',
    'about.p4.text3': '文書の管理とセキュリティをTacoPDFに任せていただきありがとうございます。安全かつ生産的に作業を進めてください！'
  },
  'pt': {
    'about.founder.text': 'Bem-vindo! Meu nome é Muhammad Bayu Edi, de Java Central, Indonésia. A ideia inicial de criar o TacoPDF nasceu puramente de experiências pessoais e desafios que eu frequentemente enfrentava na minha rotina de trabalho diária.<br/><br/>Ao gerenciar vários dados e documentos, sempre tive dificuldade em encontrar uma ferramenta de manipulação de PDF online que fosse prática e segura ao mesmo tempo. A maioria dos serviços existentes frequentemente limita o tamanho dos arquivos, adiciona marcas d\\\'água à força, exige registro de conta ou, o mais alarmante: faz o upload secreto dos nossos documentos pessoais para os seus servidores.<br/><br/>A partir dessa preocupação, decidi construir esta solução. Priorizando uma interface de usuário (UI) limpa e intuitiva, criei o TacoPDF—uma ferramenta de utilitário de documentos que é segura, rápida e confiável para qualquer pessoa, sem limitações frustrantes.',
    'about.p1.title': 'Por que usar o nome \\\'TacoPDF\\\'?',
    'about.p1.text1': 'Você pode estar se perguntando, por que um aplicativo da Indonésia usa o nome de uma comida tradicional mexicana?',
    'about.p1.text2': 'Um tempo atrás, enquanto visitava Jacarta, tive a oportunidade de provar um prato de Taco pela primeira vez. Eu imediatamente amei. Um Taco é uma comida com um conceito muito simples e fácil de segurar, mas que tem um recheio muito denso, saboroso e satisfatório.',
    'about.p1.text3': 'Essa filosofia é a principal base deste site. Eu quero que o TacoPDF seja uma plataforma com uma aparência visual muito simples e fácil de usar, mas que por trás disso possua recursos operacionais completos e robustos para resolver todas as suas necessidades de gerenciamento de documentos.',
    'about.p2.title': 'Prioridade Máxima em Privacidade (Tecnologia 100% do Cliente)',
    'about.p2.text1': 'Para mim, alta produtividade não deve sacrificar a privacidade dos dados.',
    'about.p2.text2': 'Esse é o principal motivo pelo qual o TacoPDF é construído usando a tecnologia de ponta WebAssembly (WASM). Graças a essa arquitetura, todo o processo de fusão, divisão ou conversão de documentos ocorre inteiramente na memória do navegador do seu dispositivo.',
    'about.p2.text3': 'Seus documentos sensíveis nunca serão enviados, transferidos ou armazenados em nossos servidores. Assim que o processo é concluído ou a guia do navegador é fechada, todos os dados são excluídos automaticamente da memória. O que é processado em seu dispositivo, permanecerá seguro para sempre em seu dispositivo.',
    'about.p3.title': 'Compromisso com o Serviço Gratuito e Apoio da Comunidade',
    'about.p3.text1': 'O TacoPDF está comprometido em fornecer ferramentas de documentos de nível profissional para todos, sem cobrar taxas de assinatura caras. Mantemos esta plataforma para permanecer 100% gratuita.',
    'about.p3.text2': 'Para financiar as operações dos servidores e a manutenção da infraestrutura, contamos com duas coisas: a colocação de anúncios patrocinados projetados para não interromper o seu espaço de trabalho, bem como o apoio de doações voluntárias de nossos usuários fiéis. As doações da comunidade ajudam muito o TacoPDF a continuar operando de forma independente e livre de práticas de venda de dados de usuários.',
    'about.p4.title': 'Vamos nos Conectar!',
    'about.p4.text1': 'Esta plataforma foi projetada para simplificar as tarefas administrativas diárias de estudantes, freelancers e profissionais.',
    'about.p4.text2': 'Se você tiver sugestões para adicionar novos recursos, encontrar problemas técnicos (bugs) ou apenas quiser dizer olá, não hesite em me enviar uma mensagem através da página de <a href=\'/contact\' class=\'text-primary hover:underline font-bold\'>Suporte</a>.',
    'about.p4.text3': 'Obrigado por confiar o gerenciamento e a segurança de seus documentos ao TacoPDF. Trabalhe com segurança e produtividade!'
  },
  'de': {
    'about.founder.text': 'Willkommen! Mein Name ist Muhammad Bayu Edi aus Zentraljava, Indonesien. Die ursprüngliche Idee zur Entwicklung von TacoPDF entstand rein aus persönlichen Erfahrungen und Herausforderungen, mit denen ich in meinem täglichen Arbeitsalltag oft konfrontiert war.<br/><br/>Bei der Verwaltung verschiedener Daten und Dokumente hatte ich immer Schwierigkeiten, ein Online-Tool zur PDF-Bearbeitung zu finden, das sowohl praktisch als auch sicher war. Die meisten bestehenden Dienste begrenzen oft die Dateigröße, fügen zwangsweise Wasserzeichen hinzu, erfordern eine Kontoregistrierung oder – was am alarmierendsten ist – laden unsere persönlichen Dokumente heimlich auf ihre Server hoch.<br/><br/>Aus dieser Sorge heraus habe ich mich entschlossen, diese Lösung zu entwickeln. Unter Priorisierung einer sauberen und intuitiven Benutzeroberfläche (UI) schuf ich TacoPDF – ein Dokumenten-Dienstprogramm, das für jeden sicher, schnell und zuverlässig ist, ohne frustrierende Einschränkungen.',
    'about.p1.title': 'Warum der Name \\\'TacoPDF\\\'?',
    'about.p1.text1': 'Sie fragen sich vielleicht, warum eine Anwendung aus Indonesien den Namen eines traditionellen mexikanischen Essens trägt?',
    'about.p1.text2': 'Vor einiger Zeit, während eines Besuchs in Jakarta, hatte ich die Gelegenheit, zum ersten Mal ein Taco-Gericht zu probieren. Ich habe es sofort geliebt. Ein Taco ist ein Lebensmittel mit einem sehr einfachen Konzept und leicht zu halten, aber es hat eine sehr dichte, geschmackvolle und sättigende Füllung.',
    'about.p1.text3': 'Diese Philosophie ist das Hauptfundament dieser Website. Ich möchte, dass TacoPDF eine Plattform mit einem sehr einfachen und benutzerfreundlichen visuellen Erscheinungsbild ist, die dahinter jedoch vollständige und robuste operative Funktionen besitzt, um alle Ihre Anforderungen an die Dokumentenverwaltung zu lösen.',
    'about.p2.title': 'Höchste Priorität für Datenschutz (100% Client-Technologie)',
    'about.p2.text1': 'Für mich darf hohe Produktivität nicht die Datenprivatsphäre opfern.',
    'about.p2.text2': 'Das ist der Hauptgrund, warum TacoPDF mit modernster WebAssembly (WASM)-Technologie entwickelt wurde. Dank dieser Architektur findet der gesamte Prozess des Zusammenführens, Teilens oder Konvertierens von Dokumenten vollständig im Arbeitsspeicher Ihres Browsers auf Ihrem Gerät statt.',
    'about.p2.text3': 'Ihre vertraulichen Dokumente werden niemals hochgeladen, gesendet oder auf unseren Servern gespeichert. Sobald der Vorgang abgeschlossen ist oder der Browser-Tab geschlossen wird, werden alle Daten automatisch aus dem Speicher gelöscht. Was auf Ihrem Gerät verarbeitet wird, bleibt für immer sicher auf Ihrem Gerät.',
    'about.p3.title': 'Engagement für kostenlosen Service und Community-Support',
    'about.p3.text1': 'TacoPDF hat sich verpflichtet, professionelle Dokumenten-Tools für alle bereitzustellen, ohne teure Abonnementgebühren zu erheben. Wir pflegen diese Plattform, damit sie zu 100 % kostenlos bleibt.',
    'about.p3.text2': 'Zur Finanzierung des Serverbetriebs und der Wartung der Infrastruktur stützen wir uns auf zwei Dinge: die Platzierung von gesponserten Anzeigen, die Ihren Arbeitsbereich nicht stören, sowie die Unterstützung durch freiwillige Spenden unserer treuen Benutzer. Spenden aus der Community helfen TacoPDF enorm dabei, unabhängig zu bleiben und frei von Praktiken des Verkaufs von Benutzerdaten zu operieren.',
    'about.p4.title': 'Lassen Sie uns in Kontakt treten!',
    'about.p4.text1': 'Diese Plattform wurde entwickelt, um die täglichen Verwaltungsaufgaben für Studenten, Freiberufler und Fachleute gleichermaßen zu vereinfachen.',
    'about.p4.text2': 'Wenn Sie Vorschläge für das Hinzufügen neuer Funktionen haben, auf technische Probleme (Bugs) stoßen oder einfach nur Hallo sagen möchten, zögern Sie nicht, mir eine Nachricht über die Seite <a href=\'/contact\' class=\'text-primary hover:underline font-bold\'>Support kontaktieren</a> zu senden.',
    'about.p4.text3': 'Vielen Dank, dass Sie die Verwaltung und Sicherheit Ihrer Dokumente TacoPDF anvertrauen. Arbeiten Sie sicher und produktiv!'
  },
  'fr': {
    'about.founder.text': 'Bienvenue ! Je m\\\'appelle Muhammad Bayu Edi, originaire de Java central, en Indonésie. L\\\'idée initiale de créer TacoPDF est née purement d\\\'expériences personnelles et des défis auxquels je faisais souvent face dans mon travail quotidien.<br/><br/>En gérant divers données et documents, j\\\'ai toujours eu du mal à trouver un outil de manipulation de PDF en ligne qui soit à la fois pratique et sécurisé. La plupart des services existants limitent souvent la taille des fichiers, ajoutent des filigranes de force, nécessitent la création d\\\'un compte ou, ce qui est le plus alarmant : téléchargent secrètement nos documents personnels sur leurs serveurs.<br/><br/>Face à cette préoccupation, j\\\'ai décidé de créer cette solution. En privilégiant une interface utilisateur (UI) épurée et intuitive, j\\\'ai créé TacoPDF — un outil utilitaire pour documents qui est sécurisé, rapide et fiable pour tous, sans limitations frustrantes.',
    'about.p1.title': 'Pourquoi utiliser le nom \\\'TacoPDF\\\' ?',
    'about.p1.text1': 'Vous vous demandez peut-être pourquoi une application originaire d\\\'Indonésie utilise le nom d\\\'un plat mexicain traditionnel ?',
    'about.p1.text2': 'Il y a quelque temps, lors d\\\'une visite à Jakarta, j\\\'ai eu l\\\'occasion de goûter un Taco pour la première fois. J\\\'ai tout de suite adoré. Un Taco est un aliment au concept très simple et facile à tenir, mais il possède une garniture très dense, savoureuse et satisfaisante.',
    'about.p1.text3': 'Cette philosophie est le fondement principal de ce site Web. Je veux que TacoPDF soit une plateforme à l\\\'apparence visuelle très simple et conviviale, mais qui, en arrière-plan, possède des fonctionnalités opérationnelles complètes et robustes pour répondre à tous vos besoins en matière de gestion de documents.',
    'about.p2.title': 'Priorité absolue à la confidentialité (Technologie 100% Client)',
    'about.p2.text1': 'Pour moi, une productivité élevée ne doit pas sacrifier la confidentialité des données.',
    'about.p2.text2': 'C\\\'est la raison principale pour laquelle TacoPDF est construit à l\\\'aide de la technologie de pointe WebAssembly (WASM). Grâce à cette architecture, l\\\'ensemble du processus de fusion, de division ou de conversion de documents se déroule entièrement dans la mémoire de votre navigateur sur votre appareil.',
    'about.p2.text3': 'Vos documents sensibles ne seront jamais téléchargés, envoyés ou stockés sur nos serveurs. Dès que le processus est terminé ou que l\\\'onglet du navigateur est fermé, toutes les données sont automatiquement supprimées de la mémoire. Ce qui est traité sur votre appareil restera pour toujours en sécurité sur votre appareil.',
    'about.p3.title': 'Engagement envers le service gratuit et le soutien de la communauté',
    'about.p3.text1': 'TacoPDF s\\\'engage à fournir des outils documentaires de qualité professionnelle pour tous, sans facturer de frais d\\\'abonnement coûteux. Nous maintenons cette plateforme pour qu\\\'elle reste 100 % gratuite.',
    'about.p3.text2': 'Pour financer les opérations des serveurs et la maintenance de l\\\'infrastructure, nous nous appuyons sur deux éléments : le placement d\\\'annonces sponsorisées conçues pour ne pas perturber votre espace de travail, ainsi que le soutien sous forme de dons volontaires de la part de nos utilisateurs fidèles. Les dons de la communauté aident grandement TacoPDF à continuer à fonctionner de manière indépendante et à l\\\'abri des pratiques de vente de données d\\\'utilisateurs.',
    'about.p4.title': 'Connectons-nous !',
    'about.p4.text1': 'Cette plateforme est conçue pour simplifier les tâches administratives quotidiennes des étudiants, des indépendants (freelances) et des professionnels.',
    'about.p4.text2': 'Si vous avez des suggestions pour ajouter de nouvelles fonctionnalités, si vous rencontrez des problèmes techniques (bugs) ou si vous voulez simplement dire bonjour, n\\\'hésitez pas à m\\\'envoyer un message via la page <a href=\'/contact\' class=\'text-primary hover:underline font-bold\'>Contacter le support</a>.',
    'about.p4.text3': 'Merci de confier la gestion et la sécurité de vos documents à TacoPDF. Travaillez en toute sécurité et de manière productive !'
  },
  'id': {
    'about.founder.text': 'Selamat datang! Nama saya Muhammad Bayu Edi dari Jawa Tengah, Indonesia. Ide awal pembuatan TacoPDF murni lahir dari pengalaman dan tantangan pribadi yang sering saya hadapi dalam rutinitas pekerjaan sehari-hari.<br/><br/>Saat mengelola berbagai macam data dan dokumen, saya selalu kesulitan menemukan alat manipulasi PDF daring (online) yang praktis sekaligus aman. Sebagian besar layanan yang ada sering kali membatasi ukuran berkas, menambahkan tanda air (watermark) secara paksa, mewajibkan pendaftaran akun, atau yang paling mengkhawatirkan: secara diam-diam mengunggah dokumen pribadi kita ke peladen (server) mereka.<br/><br/>Berangkat dari keresahan tersebut, saya memutuskan untuk membangun solusi ini. Dengan mengutamakan desain antarmuka (UI) yang bersih dan intuitif, saya menciptakan TacoPDF—sebuah alat utilitas dokumen yang aman, cepat, dan dapat diandalkan oleh siapa saja tanpa batasan yang menyulitkan.',
    'about.p1.title': 'Mengapa Menggunakan Nama \\\'TacoPDF\\\'?',
    'about.p1.text1': 'Anda mungkin bertanya-tanya, mengapa aplikasi dari Indonesia menggunakan nama makanan khas Meksiko?',
    'about.p1.text2': 'Beberapa waktu yang lalu, saat sedang berkunjung ke Jakarta, saya berkesempatan untuk mencicipi hidangan Taco untuk pertama kalinya. Saya langsung menyukainya. Taco adalah makanan yang konsepnya sangat sederhana dan mudah dipegang, namun memiliki isian yang sangat padat, kaya rasa, dan memuaskan.',
    'about.p1.text3': 'Filosofi inilah yang menjadi fondasi utama situs web ini. Saya ingin TacoPDF menjadi platform dengan tampilan visual yang sangat sederhana dan ramah pengguna, tetapi di balik itu, memiliki fitur operasional yang lengkap dan tangguh untuk menyelesaikan semua kebutuhan pengelolaan dokumen Anda.',
    'about.p2.title': 'Prioritas Utama pada Privasi (Teknologi 100% Klien)',
    'about.p2.text1': 'Bagi saya, produktivitas tinggi tidak boleh mengorbankan privasi data.',
    'about.p2.text2': 'Itulah alasan utama mengapa TacoPDF dibangun menggunakan teknologi mutakhir WebAssembly (WASM). Berkat arsitektur ini, seluruh proses penggabungan, pemotongan, atau konversi dokumen terjadi sepenuhnya di dalam memori peramban (browser) pada perangkat Anda.',
    'about.p2.text3': 'Dokumen sensitif Anda tidak akan pernah diunggah, dikirim, maupun disimpan di peladen kami. Segera setelah proses selesai atau tab peramban ditutup, seluruh data akan terhapus secara otomatis dari memori. Apa yang diproses di perangkat Anda, akan selamanya tetap aman berada di perangkat Anda.',
    'about.p3.title': 'Komitmen Layanan Gratis & Dukungan Komunitas',
    'about.p3.text1': 'TacoPDF berkomitmen untuk menyediakan alat dokumen setara kelas profesional bagi semua orang, tanpa membebankan biaya langganan yang mahal. Kami menjaga platform ini agar tetap 100% gratis.',
    'about.p3.text2': 'Untuk membiayai operasional peladen dan pemeliharaan infrastruktur, kami mengandalkan dua hal: penempatan iklan sponsor yang dirancang agar tidak mengganggu ruang kerja Anda, serta dukungan donasi sukarela dari para pengguna setia kami. Donasi dari komunitas sangat membantu TacoPDF untuk tetap beroperasi secara independen dan terbebas dari praktik penjualan data pengguna.',
    'about.p4.title': 'Mari Terhubung!',
    'about.p4.text1': 'Platform ini dirancang untuk mempermudah pekerjaan administrasi sehari-hari bagi pelajar, pekerja lepas (freelancer), maupun kalangan profesional.',
    'about.p4.text2': 'Jika Anda memiliki saran untuk penambahan fitur baru, menemukan kendala teknis (bug), atau sekadar ingin menyapa, jangan ragu untuk mengirimkan pesan kepada saya melalui halaman <a href=\'/contact\' class=\'text-primary hover:underline font-bold\'>Hubungi Dukungan</a>.',
    'about.p4.text3': 'Terima kasih telah mempercayakan pengelolaan dan keamanan dokumen Anda pada TacoPDF. Selamat bekerja dengan aman dan produktif!'
  }
};

let content = fs.readFileSync('d:/Tacopdf/src/data/translations.ts', 'utf8');

for (const lang of Object.keys(data)) {
  const translations = data[lang];
  
  const langStartRegex = new RegExp(`"${lang}"\\s*:\\s*\\{`);
  const match = langStartRegex.exec(content);
  if (!match) {
    console.error(`Language block ${lang} not found!`);
    continue;
  }
  const startIndex = match.index;
  
  let openBraces = 0;
  let endIndex = -1;
  for (let i = startIndex + match[0].length - 1; i < content.length; i++) {
    if (content[i] === '{') openBraces++;
    else if (content[i] === '}') {
      openBraces--;
      if (openBraces === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  if (endIndex === -1) {
    console.error(`End of language block ${lang} not found!`);
    continue;
  }
  
  let blockContent = content.substring(startIndex, endIndex + 1);
  
  for (const key of Object.keys(translations)) {
    const newValue = translations[key];
    const escapedValue = newValue.replace(/"/g, '\\"').replace(/\\'/g, "'").replace(/\n/g, '\\n');
    const keyRegex = new RegExp(`"${key.replace(/\\./g, '\\\\.')}"\\s*:\\s*"(?:\\\\\\\\.|[^"\\\\\\\\])*"`);
    if (!keyRegex.test(blockContent)) {
      console.warn(`Warning: Key ${key} not found in language ${lang}`);
    }
    blockContent = blockContent.replace(keyRegex, `"${key}": "${escapedValue}"`);
  }
  
  content = content.substring(0, startIndex) + blockContent + content.substring(endIndex + 1);
}

fs.writeFileSync('d:/Tacopdf/src/data/translations.ts', content, 'utf8');
console.log('Update complete!');
