const fs = require('fs');

const aboutTranslations = {
  "en": {
    "about.founder.title": "Creator & Founder",
    "about.founder.text": "Welcome! My name is Muhammad Bayu Edi, a software developer from Central Java, Indonesia. The initial idea of creating TacoPDF was born from personal experiences and challenges I frequently faced while working.<br/><br/>In my routine of managing various documents, I always struggled to find an online PDF manipulation tool that was both practical and secure. Most existing services often limit file sizes, forcefully add watermarks, require account registration, or most alarmingly: silently upload our personal documents to their servers.<br/><br/>Stemming from this concern, I decided to build my own solution. Prioritizing a clean and intuitive user interface (UI), I created TacoPDF—a document utility tool that is secure, fast, and reliable for anyone without frustrating limitations.",
    "about.p1.title": "Why Use the Name 'TacoPDF'?",
    "about.p1.text1": "You might be wondering, why does an application from Indonesia use the name of a traditional Mexican food?",
    "about.p1.text2": "A while ago, while visiting Jakarta, I had the opportunity to taste a Taco dish for the first time. I immediately loved it. A Taco is a food with a very simple concept and easy to hold, yet it has a very dense, flavorful, and satisfying filling.",
    "about.p1.text3": "This philosophy is the main foundation of this website. I wanted TacoPDF to be a platform with a very simple and user-friendly visual appearance, but beneath that, possess complete and robust operational features to solve all your document management needs.",
    "about.p2.title": "Top Priority on Privacy (100% Client Technology)",
    "about.p2.text1": "For me, high productivity must not sacrifice data privacy.",
    "about.p2.text2": "That is the main reason why TacoPDF is built using cutting-edge WebAssembly (WASM) technology. Thanks to this architecture, the entire process of merging, splitting, or converting documents occurs entirely within your browser's memory on your device.",
    "about.p2.text3": "Your sensitive documents will never be uploaded, sent, or stored on our servers. As soon as the process is complete or the browser tab is closed, all data is automatically deleted from memory. What is processed on your device, will forever remain safely on your device.",
    "about.p3.title": "Commitment to Free Service & Community Support",
    "about.p3.text1": "TacoPDF is committed to providing professional-grade document tools for everyone, without charging expensive subscription fees. We maintain this platform to remain 100% free.",
    "about.p3.text2": "To fund server operations and infrastructure maintenance, we rely on two things: the placement of sponsored ads designed not to disrupt your workspace, as well as voluntary donation support from our loyal users. Donations from the community greatly help TacoPDF to remain operating independently and free from user data selling practices.",
    "about.p4.title": "Let's Connect!",
    "about.p4.text1": "This platform is designed to simplify daily administrative tasks for students, freelancers, and professionals alike.",
    "about.p4.text2": "If you have suggestions for adding new features, encounter technical issues (bugs), or just want to say hello, do not hesitate to send me a message through the Contact Support page.",
    "about.p4.text3": "Thank you for entrusting your document management and security to TacoPDF. Work safely and productively!"
  },
  "id": {
    "about.founder.title": "Kreator & Pendiri",
    "about.founder.text": "Selamat datang! Nama saya Muhammad Bayu Edi, seorang pengembang perangkat lunak (software developer) dari Jawa Tengah, Indonesia. Ide awal pembuatan TacoPDF lahir dari pengalaman dan tantangan pribadi yang sering saya hadapi saat bekerja.<br/><br/>Dalam rutinitas mengelola berbagai macam dokumen, saya selalu kesulitan menemukan alat manipulasi PDF daring (online) yang praktis sekaligus aman. Sebagian besar layanan yang ada sering kali membatasi ukuran berkas, menambahkan tanda air (watermark) secara paksa, mewajibkan pendaftaran akun, atau yang paling mengkhawatirkan: secara diam-diam mengunggah dokumen pribadi kita ke peladen (server) mereka.<br/><br/>Berangkat dari keresahan tersebut, saya memutuskan untuk membangun solusi saya sendiri. Dengan mengutamakan desain antarmuka (UI) yang bersih dan intuitif, saya menciptakan TacoPDF—sebuah alat utilitas dokumen yang aman, cepat, dan dapat diandalkan oleh siapa saja tanpa batasan yang menyulitkan.",
    "about.p1.title": "Mengapa Menggunakan Nama 'TacoPDF'?",
    "about.p1.text1": "Anda mungkin bertanya-tanya, mengapa aplikasi dari Indonesia menggunakan nama makanan khas Meksiko?",
    "about.p1.text2": "Beberapa waktu yang lalu, saat sedang berkunjung ke Jakarta, saya berkesempatan untuk mencicipi hidangan Taco untuk pertama kalinya. Saya langsung menyukainya. Taco adalah makanan yang konsepnya sangat sederhana dan mudah dipegang, namun memiliki isian yang sangat padat, kaya rasa, dan memuaskan.",
    "about.p1.text3": "Filosofi inilah yang menjadi fondasi utama situs web ini. Saya ingin TacoPDF menjadi platform dengan tampilan visual yang sangat sederhana dan ramah pengguna, tetapi di balik itu, memiliki fitur operasional yang lengkap dan tangguh untuk menyelesaikan semua kebutuhan pengelolaan dokumen Anda.",
    "about.p2.title": "Prioritas Utama pada Privasi (Teknologi 100% Klien)",
    "about.p2.text1": "Bagi saya, produktivitas tinggi tidak boleh mengorbankan privasi data.",
    "about.p2.text2": "Itulah alasan utama mengapa TacoPDF dibangun menggunakan teknologi mutakhir WebAssembly (WASM). Berkat arsitektur ini, seluruh proses penggabungan, pemotongan, atau konversi dokumen terjadi sepenuhnya di dalam memori peramban (browser) pada perangkat Anda.",
    "about.p2.text3": "Dokumen sensitif Anda tidak akan pernah diunggah, dikirim, maupun disimpan di peladen kami. Segera setelah proses selesai atau tab peramban ditutup, seluruh data akan terhapus secara otomatis dari memori. Apa yang diproses di perangkat Anda, akan selamanya tetap aman berada di perangkat Anda.",
    "about.p3.title": "Komitmen Layanan Gratis & Dukungan Komunitas",
    "about.p3.text1": "TacoPDF berkomitmen untuk menyediakan alat dokumen setara kelas profesional bagi semua orang, tanpa membebankan biaya langganan yang mahal. Kami menjaga platform ini agar tetap 100% gratis.",
    "about.p3.text2": "Untuk membiayai operasional peladen dan pemeliharaan infrastruktur, kami mengandalkan dua hal: penempatan iklan sponsor yang dirancang agar tidak mengganggu ruang kerja Anda, serta dukungan donasi sukarela dari para pengguna setia kami. Donasi dari komunitas sangat membantu TacoPDF untuk tetap beroperasi secara independen dan terbebas dari praktik penjualan data pengguna.",
    "about.p4.title": "Mari Terhubung!",
    "about.p4.text1": "Platform ini dirancang untuk mempermudah pekerjaan administrasi sehari-hari bagi pelajar, pekerja lepas (freelancer), maupun kalangan profesional.",
    "about.p4.text2": "Jika Anda memiliki saran untuk penambahan fitur baru, menemukan kendala teknis (bug), atau sekadar ingin menyapa, jangan ragu untuk mengirimkan pesan kepada saya melalui halaman Hubungi Dukungan.",
    "about.p4.text3": "Terima kasih telah mempercayakan pengelolaan dan keamanan dokumen Anda pada TacoPDF. Selamat bekerja dengan aman dan produktif!"
  },
  "es": {
    "about.founder.title": "Creador y Fundador",
    "about.founder.text": "¡Bienvenidos! Mi nombre es Muhammad Bayu Edi, desarrollador de software de Java Central, Indonesia. La idea inicial de crear TacoPDF nació de experiencias personales y desafíos que enfrentaba frecuentemente mientras trabajaba.<br/><br/>En mi rutina de administrar varios documentos, siempre me costaba encontrar una herramienta de manipulación de PDF en línea que fuera práctica y segura. La mayoría de los servicios existentes a menudo limitan el tamaño de los archivos, agregan marcas de agua por la fuerza, requieren registro de cuenta, o lo más alarmante: suben secretamente nuestros documentos personales a sus servidores.<br/><br/>A raíz de esta preocupación, decidí construir mi propia solución. Priorizando una interfaz de usuario (UI) limpia e intuitiva, creé TacoPDF: una herramienta de utilidad de documentos segura, rápida y confiable para cualquier persona sin limitaciones frustrantes.",
    "about.p1.title": "¿Por qué usar el nombre 'TacoPDF'?",
    "about.p1.text1": "Quizás te preguntes, ¿por qué una aplicación de Indonesia usa el nombre de una comida tradicional mexicana?",
    "about.p1.text2": "Hace un tiempo, mientras visitaba Yakarta, tuve la oportunidad de probar un platillo de Taco por primera vez. Me encantó de inmediato. Un Taco es un alimento con un concepto muy simple y fácil de sostener, pero tiene un relleno muy denso, sabroso y satisfactorio.",
    "about.p1.text3": "Esta filosofía es la base principal de este sitio web. Quería que TacoPDF fuera una plataforma con una apariencia visual muy simple y fácil de usar, pero debajo de eso, poseer características operativas completas y robustas para resolver todas sus necesidades de gestión de documentos.",
    "about.p2.title": "Máxima Prioridad a la Privacidad (Tecnología 100% Cliente)",
    "about.p2.text1": "Para mí, la alta productividad no debe sacrificar la privacidad de los datos.",
    "about.p2.text2": "Esa es la razón principal por la que TacoPDF está construido con tecnología de vanguardia WebAssembly (WASM). Gracias a esta arquitectura, todo el proceso de fusionar, dividir o convertir documentos ocurre completamente dentro de la memoria de tu navegador en tu dispositivo.",
    "about.p2.text3": "Sus documentos confidenciales nunca se subirán, enviarán ni almacenarán en nuestros servidores. Tan pronto como se complete el proceso o se cierre la pestaña del navegador, todos los datos se eliminarán automáticamente de la memoria. Lo que se procesa en tu dispositivo, permanecerá seguro para siempre en tu dispositivo.",
    "about.p3.title": "Compromiso de Servicio Gratuito y Apoyo de la Comunidad",
    "about.p3.text1": "TacoPDF se compromete a proporcionar herramientas de documentos de nivel profesional para todos, sin cobrar costosas tarifas de suscripción. Mantenemos esta plataforma para que siga siendo 100% gratuita.",
    "about.p3.text2": "Para financiar las operaciones del servidor y el mantenimiento de la infraestructura, nos basamos en dos cosas: la colocación de anuncios patrocinados diseñados para no interrumpir tu espacio de trabajo, así como el apoyo voluntario de donaciones de nuestros fieles usuarios. Las donaciones de la comunidad ayudan enormemente a que TacoPDF siga operando de manera independiente y libre de prácticas de venta de datos de usuarios.",
    "about.p4.title": "¡Conectemos!",
    "about.p4.text1": "Esta plataforma está diseñada para simplificar las tareas administrativas diarias para estudiantes, autónomos y profesionales por igual.",
    "about.p4.text2": "Si tienes sugerencias para agregar nuevas funciones, encuentras problemas técnicos (bugs) o simplemente quieres saludar, no dudes en enviarme un mensaje a través de la página de Contacto de Soporte.",
    "about.p4.text3": "Gracias por confiar la gestión y seguridad de sus documentos a TacoPDF. ¡Trabaja de manera segura y productiva!"
  },
  "fr": {
    "about.founder.title": "Créateur & Fondateur",
    "about.founder.text": "Bienvenue ! Je m'appelle Muhammad Bayu Edi, développeur de logiciels originaire de Java central, en Indonésie. L'idée initiale de créer TacoPDF est née d'expériences personnelles et de défis auxquels j'ai été fréquemment confronté en travaillant.<br/><br/>Dans ma routine de gestion de divers documents, j'ai toujours eu du mal à trouver un outil de manipulation de PDF en ligne à la fois pratique et sécurisé. La plupart des services existants limitent souvent la taille des fichiers, ajoutent de force des filigranes, nécessitent l'enregistrement d'un compte, ou le plus alarmant : téléchargent silencieusement nos documents personnels sur leurs serveurs.<br/><br/>Suite à cette préoccupation, j'ai décidé de créer ma propre solution. En privilégiant une interface utilisateur (UI) propre et intuitive, j'ai créé TacoPDF : un outil utilitaire de documents sécurisé, rapide et fiable pour tous, sans limitations frustrantes.",
    "about.p1.title": "Pourquoi utiliser le nom « TacoPDF » ?",
    "about.p1.text1": "Vous vous demandez peut-être pourquoi une application originaire d'Indonésie utilise le nom d'un plat traditionnel mexicain ?",
    "about.p1.text2": "Il y a quelque temps, lors d'une visite à Jakarta, j'ai eu l'occasion de goûter un plat de Taco pour la première fois. J'ai tout de suite adoré. Un Taco est un aliment avec un concept très simple et facile à tenir, mais il a une garniture très dense, savoureuse et satisfaisante.",
    "about.p1.text3": "Cette philosophie est le fondement principal de ce site Web. Je voulais que TacoPDF soit une plateforme avec une apparence visuelle très simple et conviviale, mais en dessous de cela, posséder des fonctionnalités opérationnelles complètes et robustes pour résoudre tous vos besoins de gestion de documents.",
    "about.p2.title": "Priorité absolue à la confidentialité (Technologie 100 % Client)",
    "about.p2.text1": "Pour moi, une productivité élevée ne doit pas sacrifier la confidentialité des données.",
    "about.p2.text2": "C'est la principale raison pour laquelle TacoPDF est construit en utilisant la technologie de pointe WebAssembly (WASM). Grâce à cette architecture, l'ensemble du processus de fusion, de division ou de conversion des documents se produit entièrement dans la mémoire de votre navigateur sur votre appareil.",
    "about.p2.text3": "Vos documents sensibles ne seront jamais téléchargés, envoyés ou stockés sur nos serveurs. Dès que le processus est terminé ou que l'onglet du navigateur est fermé, toutes les données sont automatiquement supprimées de la mémoire. Ce qui est traité sur votre appareil, restera pour toujours en toute sécurité sur votre appareil.",
    "about.p3.title": "Engagement de service gratuit & Soutien de la communauté",
    "about.p3.text1": "TacoPDF s'engage à fournir des outils documentaires de qualité professionnelle pour tout le monde, sans facturer de frais d'abonnement coûteux. Nous maintenons cette plateforme pour qu'elle reste 100 % gratuite.",
    "about.p3.text2": "Pour financer les opérations du serveur et la maintenance de l'infrastructure, nous nous appuyons sur deux choses : le placement de publicités sponsorisées conçues pour ne pas perturber votre espace de travail, ainsi que le soutien par dons volontaires de nos fidèles utilisateurs. Les dons de la communauté aident grandement TacoPDF à continuer de fonctionner de manière indépendante et sans pratiques de vente de données d'utilisateurs.",
    "about.p4.title": "Restons connectés !",
    "about.p4.text1": "Cette plateforme est conçue pour simplifier les tâches administratives quotidiennes des étudiants, des pigistes et des professionnels.",
    "about.p4.text2": "Si vous avez des suggestions d'ajout de nouvelles fonctionnalités, si vous rencontrez des problèmes techniques (bugs) ou si vous souhaitez simplement dire bonjour, n'hésitez pas à m'envoyer un message via la page Contacter l'assistance.",
    "about.p4.text3": "Merci de confier la gestion et la sécurité de vos documents à TacoPDF. Travaillez en toute sécurité et de manière productive !"
  },
  "de": {
    "about.founder.title": "Schöpfer & Gründer",
    "about.founder.text": "Willkommen! Mein Name ist Muhammad Bayu Edi, ein Softwareentwickler aus Zentral-Java, Indonesien. Die ursprüngliche Idee zur Entwicklung von TacoPDF entstand aus persönlichen Erfahrungen und Herausforderungen, mit denen ich während der Arbeit häufig konfrontiert war.<br/><br/>Bei meiner Routine der Verwaltung verschiedener Dokumente hatte ich immer Mühe, ein praktisches und sicheres Online-PDF-Bearbeitungstool zu finden. Die meisten bestehenden Dienste beschränken häufig die Dateigröße, fügen zwangsweise Wasserzeichen hinzu, erfordern eine Kontoregistrierung oder am alarmierendsten: laden unsere persönlichen Dokumente heimlich auf ihre Server hoch.<br/><br/>Aufgrund dieser Bedenken beschloss ich, meine eigene Lösung zu entwickeln. Unter Bevorzugung einer sauberen und intuitiven Benutzeroberfläche (UI) habe ich TacoPDF erstellt – ein sicheres, schnelles und zuverlässiges Dokumenten-Dienstprogramm für jedermann ohne frustrierende Einschränkungen.",
    "about.p1.title": "Warum den Namen 'TacoPDF' verwenden?",
    "about.p1.text1": "Sie fragen sich vielleicht, warum eine Anwendung aus Indonesien den Namen eines traditionellen mexikanischen Essens trägt?",
    "about.p1.text2": "Vor einiger Zeit hatte ich bei einem Besuch in Jakarta die Gelegenheit, zum ersten Mal ein Taco-Gericht zu probieren. Ich habe es sofort geliebt. Ein Taco ist ein Essen mit einem sehr einfachen Konzept und leicht zu halten, aber es hat eine sehr dichte, geschmackvolle und befriedigende Füllung.",
    "about.p1.text3": "Diese Philosophie ist die Hauptgrundlage dieser Website. Ich wollte, dass TacoPDF eine Plattform mit einem sehr einfachen und benutzerfreundlichen visuellen Erscheinungsbild ist, aber darunter vollständige und robuste operative Funktionen besitzt, um alle Ihre Anforderungen an die Dokumentenverwaltung zu lösen.",
    "about.p2.title": "Höchste Priorität auf Datenschutz (100% Client-Technologie)",
    "about.p2.text1": "Für mich darf eine hohe Produktivität nicht den Datenschutz opfern.",
    "about.p2.text2": "Das ist der Hauptgrund, warum TacoPDF mit modernster WebAssembly (WASM) Technologie entwickelt wurde. Dank dieser Architektur findet der gesamte Prozess des Zusammenführens, Teilens oder Konvertierens von Dokumenten vollständig im Speicher Ihres Browsers auf Ihrem Gerät statt.",
    "about.p2.text3": "Ihre sensiblen Dokumente werden niemals auf unsere Server hochgeladen, gesendet oder gespeichert. Sobald der Vorgang abgeschlossen ist oder der Browser-Tab geschlossen wird, werden alle Daten automatisch aus dem Speicher gelöscht. Was auf Ihrem Gerät verarbeitet wird, bleibt für immer sicher auf Ihrem Gerät.",
    "about.p3.title": "Verpflichtung zu kostenlosem Service & Community-Unterstützung",
    "about.p3.text1": "TacoPDF verpflichtet sich, professionelle Dokumenten-Tools für jedermann bereitzustellen, ohne teure Abonnementgebühren zu erheben. Wir erhalten diese Plattform, damit sie 100% kostenlos bleibt.",
    "about.p3.text2": "Um den Serverbetrieb und die Infrastrukturwartung zu finanzieren, verlassen wir uns auf zwei Dinge: die Platzierung von gesponserten Anzeigen, die so gestaltet sind, dass sie Ihren Arbeitsbereich nicht stören, sowie die Unterstützung durch freiwillige Spenden unserer treuen Benutzer. Spenden aus der Community helfen TacoPDF enorm, weiterhin unabhängig und frei von Verkaufspraktiken von Benutzerdaten zu operieren.",
    "about.p4.title": "Lassen Sie uns verbinden!",
    "about.p4.text1": "Diese Plattform wurde entwickelt, um die täglichen Verwaltungsaufgaben für Studenten, Freiberufler und Fachleute gleichermaßen zu vereinfachen.",
    "about.p4.text2": "Wenn Sie Vorschläge für neue Funktionen haben, auf technische Probleme (Bugs) stoßen oder einfach nur Hallo sagen möchten, zögern Sie nicht, mir über die Seite Support kontaktieren eine Nachricht zu senden.",
    "about.p4.text3": "Vielen Dank, dass Sie die Verwaltung und Sicherheit Ihrer Dokumente TacoPDF anvertrauen. Arbeiten Sie sicher und produktiv!"
  },
  "pt": {
    "about.founder.title": "Criador e Fundador",
    "about.founder.text": "Bem-vindos! Meu nome é Muhammad Bayu Edi, um desenvolvedor de software de Java Central, Indonésia. A ideia inicial de criar o TacoPDF nasceu de experiências pessoais e desafios que eu enfrentava frequentemente enquanto trabalhava.<br/><br/>Na minha rotina de gerenciamento de vários documentos, sempre tive dificuldade em encontrar uma ferramenta de manipulação de PDF online que fosse prática e segura. A maioria dos serviços existentes geralmente limita o tamanho dos arquivos, adiciona marcas d'água à força, exige registro de conta ou, o mais alarmante: carrega secretamente nossos documentos pessoais para seus servidores.<br/><br/>Decorrente dessa preocupação, decidi construir minha própria solução. Priorizando uma interface de usuário (UI) limpa e intuitiva, criei o TacoPDF—uma ferramenta utilitária de documentos que é segura, rápida e confiável para qualquer pessoa, sem limitações frustrantes.",
    "about.p1.title": "Por que usar o nome 'TacoPDF'?",
    "about.p1.text1": "Você deve estar se perguntando: por que um aplicativo da Indonésia usa o nome de uma comida tradicional mexicana?",
    "about.p1.text2": "Um tempo atrás, durante uma visita a Jacarta, tive a oportunidade de provar um prato de Taco pela primeira vez. Eu imediatamente amei. Um Taco é uma comida com um conceito muito simples e fácil de segurar, mas tem um recheio muito denso, saboroso e satisfatório.",
    "about.p1.text3": "Essa filosofia é o alicerce principal deste site. Eu queria que o TacoPDF fosse uma plataforma com uma aparência visual muito simples e fácil de usar, mas por baixo disso, possuísse recursos operacionais completos e robustos para resolver todas as suas necessidades de gerenciamento de documentos.",
    "about.p2.title": "Prioridade Máxima em Privacidade (Tecnologia 100% Cliente)",
    "about.p2.text1": "Para mim, alta produtividade não deve sacrificar a privacidade dos dados.",
    "about.p2.text2": "Essa é a principal razão pela qual o TacoPDF é construído usando a tecnologia de ponta WebAssembly (WASM). Graças a essa arquitetura, todo o processo de mesclagem, divisão ou conversão de documentos ocorre inteiramente na memória do seu navegador no seu dispositivo.",
    "about.p2.text3": "Seus documentos confidenciais nunca serão carregados, enviados ou armazenados em nossos servidores. Assim que o processo for concluído ou a guia do navegador for fechada, todos os dados serão excluídos automaticamente da memória. O que é processado em seu dispositivo, permanecerá para sempre em segurança em seu dispositivo.",
    "about.p3.title": "Compromisso com o Serviço Gratuito e Apoio da Comunidade",
    "about.p3.text1": "O TacoPDF está empenhado em fornecer ferramentas de documentos de nível profissional para todos, sem cobrar taxas de assinatura caras. Mantemos esta plataforma para que continue sendo 100% gratuita.",
    "about.p3.text2": "Para financiar as operações do servidor e a manutenção da infraestrutura, contamos com duas coisas: a colocação de anúncios patrocinados projetados para não interromper seu espaço de trabalho, bem como o apoio de doações voluntárias de nossos usuários fiéis. Doações da comunidade ajudam muito o TacoPDF a continuar operando de forma independente e livre de práticas de venda de dados de usuários.",
    "about.p4.title": "Vamos nos Conectar!",
    "about.p4.text1": "Esta plataforma foi projetada para simplificar as tarefas administrativas diárias de estudantes, freelancers e profissionais.",
    "about.p4.text2": "Se você tiver sugestões para adicionar novos recursos, encontrar problemas técnicos (bugs) ou apenas quiser dizer olá, não hesite em me enviar uma mensagem através da página Entrar em Contato com o Suporte.",
    "about.p4.text3": "Obrigado por confiar o gerenciamento e a segurança de seus documentos ao TacoPDF. Trabalhe de forma segura e produtiva!"
  },
  "ja": {
    "about.founder.title": "作成者および創設者",
    "about.founder.text": "ようこそ！私の名前はムハンマド・バユ・エディです。インドネシアの中部ジャワ出身のソフトウェア開発者です。TacoPDFを作成するという最初のアイデアは、私が仕事中に頻繁に直面していた個人的な経験と課題から生まれました。<br/><br/>さまざまなドキュメントを管理するルーチンの中で、私は常に実用的で安全なオンラインPDF操作ツールを見つけるのに苦労していました。既存のサービスのほとんどは、ファイルサイズを制限したり、透かしを強制的に追加したり、アカウント登録を要求したり、さらに憂慮すべきことに、私たちの個人ドキュメントを彼らのサーバーに密かにアップロードしたりすることがよくありました。<br/><br/>この懸念から、私は自分自身のソリューションを構築することにしました。クリーンで直感的なユーザーインターフェイス（UI）を優先し、フラストレーションのたまる制限なしに、誰にとっても安全で高速かつ信頼できるドキュメントユーティリティツールであるTacoPDFを作成しました。",
    "about.p1.title": "「TacoPDF」という名前を使用する理由",
    "about.p1.text1": "インドネシアのアプリケーションが、なぜ伝統的なメキシコ料理の名前を使用しているのか疑問に思うかもしれません。",
    "about.p1.text2": "少し前、ジャカルタを訪れた際、初めてタコス料理を味わう機会がありました。私はすぐにそれが気に入りました。タコスは非常にシンプルなコンセプトで持ちやすい食べ物ですが、非常に密度が高く、風味豊かで満足のいく具材が詰まっています。",
    "about.p1.text3": "この哲学が、このウェブサイトの主要な基盤です。私は、TacoPDFを非常にシンプルでユーザーフレンドリーな視覚的魅力を備えたプラットフォームにしたいと考えていました。しかし、その下には、ドキュメント管理のすべてのニーズを解決するための完全で堅牢な運用機能が備わっています。",
    "about.p2.title": "プライバシーを最優先（100％クライアントテクノロジー）",
    "about.p2.text1": "私にとって、高い生産性はデータのプライバシーを犠牲にしてはなりません。",
    "about.p2.text2": "これが、TacoPDFが最先端のWebAssembly（WASM）テクノロジーを使用して構築されている主な理由です。このアーキテクチャのおかげで、ドキュメントの結合、分割、または変換のプロセス全体が、デバイス上のブラウザのメモリ内で完全に実行されます。",
    "about.p2.text3": "お客様の機密文書が当社のサーバーにアップロード、送信、または保存されることは決してありません。プロセスが完了するか、ブラウザのタブが閉じられるとすぐに、すべてのデータはメモリから自動的に削除されます。デバイス上で処理されたものは、永遠に安全にお客様のデバイス上に残ります。",
    "about.p3.title": "無料サービスとコミュニティサポートへの取り組み",
    "about.p3.text1": "TacoPDFは、高価なサブスクリプション料金を請求することなく、プロ仕様のドキュメントツールをすべてのユーザーに提供することをお約束します。このプラットフォームを100％無料に保つために維持しています。",
    "about.p3.text2": "サーバーの運用とインフラストラクチャの保守に資金を提供するために、私たちは2つのことに依存しています。ワークスペースを妨害しないように設計されたスポンサー広告の配置と、忠実なユーザーからの任意の寄付によるサポートです。コミュニティからの寄付は、TacoPDFがユーザーデータの販売慣行から解放され、独立して運用を継続する上で大いに役立ちます。",
    "about.p4.title": "つながりましょう！",
    "about.p4.text1": "このプラットフォームは、学生、フリーランサー、専門家などの日常的な管理タスクを簡素化するように設計されています。",
    "about.p4.text2": "新機能の追加に関するご提案がある場合、技術的な問題（バグ）が発生した場合、または単に挨拶をしたい場合は、サポートに連絡ページからお気軽にメッセージを送信してください。",
    "about.p4.text3": "TacoPDFにドキュメントの管理とセキュリティを委託していただきありがとうございます。安全かつ生産的に働きましょう！"
  }
};

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

for (const [lang, translations] of Object.entries(aboutTranslations)) {
    const langKey = '"' + lang + '": {';
    const langStart = content.indexOf(langKey);
    if (langStart === -1) {
        console.log("Language not found: " + lang);
        continue;
    }
    
    // Convert translations to string
    let insertStr = '';
    for (const [k, v] of Object.entries(translations)) {
        insertStr += `\n    "${k}": ${JSON.stringify(v)},`;
    }
    
    // Find the next line after '"lang": {'
    const insertionPoint = langStart + langKey.length;
    
    content = content.substring(0, insertionPoint) + insertStr + content.substring(insertionPoint);
    console.log("Injected About Us for " + lang);
}

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log("All done!");
