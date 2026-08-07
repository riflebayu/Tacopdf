const fs = require('fs');

const replacements = {
  "en": `"tos.doc_title": "Terms of Service",
    "tos.intro": "Welcome to TacoPDF. By accessing or using our website and client-side software, you agree to be legally bound by these Terms of Service. Please read them carefully. If you do not agree to these terms, please do not use our services.",
    "tos.p1.title": "1. Acceptance of Terms & Lawful Use",
    "tos.p1.text": "You agree to use our PDF manipulation tools responsibly and in full compliance with applicable laws. You are strictly prohibited from using TacoPDF to facilitate illegal activities, fraud, document forgery, unlawful document manipulation, or the infringement of third-party intellectual property rights. Any legal consequences resulting from the misuse of this tool are solely your responsibility as a user.",
    "tos.p2.title": "2. Local Processing Architecture (Client-Side)",
    "tos.p2.text": "You understand and agree that TacoPDF operates using a modern client-side architecture. This means that the documents you process are never uploaded to our servers. The entire file manipulation process occurs exclusively within the browser memory on your device. Therefore, the confidentiality and security of the physical documents during the process remain entirely under your control.",
    "tos.p3.title": "3. Intellectual Property Rights & Document Ownership",
    "tos.p3.text": "The TacoPDF branding, user interface (UI), logos, graphic design, and frontend codebase are our exclusive intellectual property. However, we do not claim any ownership over the PDF documents you process. All copyrights, confidentiality, and intellectual property rights in your files remain entirely yours.",
    "tos.p4.title": "4. Disclaimer of Warranties",
    "tos.p4.text": "TacoPDF services are provided on an \\"as is\\" and \\"as available\\" basis without any warranties, either express or implied. Because our tool operates purely locally, the performance and processing results are highly dependent on the memory capabilities, browser, and specifications of your device. We do not warrant that this service will be 100% free of technical errors, that files will not experience partial malfunction during processing, or that the conversion output will always perfectly meet your expectations.",
    "tos.p5.title": "5. Voluntary Donations & No-Refund Policy",
    "tos.p5.text": "TacoPDF is a free service. To support server operational costs and development, we accept voluntary donations through third-party platforms (Saweria and Ko-Fi).<br><br>Donations are entirely voluntary and are not valid as payment for the purchase of premium services or features.<br><br>You acknowledge that donation transactions are handled by third parties, and TacoPDF does not store your financial data.<br><br>All donations made are final and non-refundable for any reason.<br><br>TacoPDF is not an official charitable organization; donations cannot be used for tax deductions.",
    "tos.p6.title": "6. Limitation of Liability",
    "tos.p6.text": "To the fullest extent permitted by law, in no event shall TacoPDF, its developers, affiliates, or our donation processing platforms be liable for any direct, indirect, incidental, special, or consequential damages. This includes, but is not limited to: loss of data, file corruption, business interruption, failure of donation transactions, or financial losses arising from your use of or inability to use our services. You are solely responsible for backing up your original documents prior to processing.",
    "tos.p7.title": "7. Modification of Services & Terms",
    "tos.p7.text": "We reserve the right to modify, update, suspend, or discontinue any feature of TacoPDF (including the donation mechanism) at any time without prior notice. We also reserve the right to periodically revise these Terms of Service. Your continued use of the site after any changes constitutes your acceptance of the updated terms.",
    "tos.p8.title": "8. Governing Law",
    "tos.p8.text": "These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law principles.",
    "tos.p9.title": "9. Contact Us",
    "tos.p9.text": "If you have any legal questions, concerns, or require clarification regarding these Terms of Service, please contact our team via the <a href=\\"/contact\\" class=\\"text-primary underline\\">Contact Support</a> page."`,
  
  "id": `"tos.doc_title": "Ketentuan Layanan",
    "tos.intro": "Selamat datang di TacoPDF. Dengan mengakses atau menggunakan situs web dan perangkat lunak client-side kami, Anda setuju untuk terikat secara hukum dengan Ketentuan Layanan ini. Harap membacanya dengan cermat. Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan kami.",
    "tos.p1.title": "1. Penerimaan Syarat & Penggunaan yang Sah",
    "tos.p1.text": "Anda setuju untuk menggunakan alat manipulasi PDF kami secara bertanggung jawab dan sepenuhnya mematuhi hukum yang berlaku. Anda dilarang keras menggunakan TacoPDF untuk memfasilitasi aktivitas ilegal, penipuan, pemalsuan dokumen, manipulasi dokumen yang melanggar hukum, atau pelanggaran hak kekayaan intelektual pihak ketiga. Segala konsekuensi hukum akibat penyalahgunaan alat ini sepenuhnya menjadi tanggung jawab Anda sebagai pengguna.",
    "tos.p2.title": "2. Arsitektur Pemrosesan Lokal (Client-Side)",
    "tos.p2.text": "Anda memahami dan menyetujui bahwa TacoPDF beroperasi menggunakan arsitektur client-side modern. Artinya, dokumen yang Anda proses tidak pernah diunggah ke server kami. Seluruh proses manipulasi file terjadi secara eksklusif di dalam memori browser pada perangkat Anda. Oleh karena itu, kerahasiaan dan keamanan dokumen fisik selama proses berlangsung berada sepenuhnya dalam kendali Anda.",
    "tos.p3.title": "3. Hak Kekayaan Intelektual & Kepemilikan Dokumen",
    "tos.p3.text": "Pencitraan merek TacoPDF, antarmuka pengguna (UI), logo, desain grafis, dan basis kode frontend adalah kekayaan intelektual eksklusif kami. Namun, kami tidak mengklaim kepemilikan apa pun atas dokumen PDF yang Anda proses. Semua hak cipta, kerahasiaan, dan hak kekayaan intelektual dalam file Anda tetap menjadi milik Anda sepenuhnya.",
    "tos.p4.title": "4. Penafian Jaminan (Disclaimer of Warranties)",
    "tos.p4.text": "Layanan TacoPDF disediakan atas dasar \\"sebagaimana adanya\\" (as is) dan \\"sebagaimana tersedia\\" (as available) tanpa jaminan apa pun, baik tersurat maupun tersirat. Karena alat kami beroperasi murni secara lokal, kinerja dan hasil pemrosesan sangat bergantung pada kapabilitas memori, browser, dan spesifikasi perangkat Anda. Kami tidak menjamin bahwa layanan ini akan 100% bebas dari kesalahan teknis, bahwa file tidak akan mengalami malfungsi parsial selama pemrosesan, atau bahwa output konversi akan selalu sempurna sesuai ekspektasi Anda.",
    "tos.p5.title": "5. Donasi Sukarela & Kebijakan No-Refund",
    "tos.p5.text": "TacoPDF adalah layanan gratis. Untuk mendukung biaya operasional peladen dan pengembangan, kami menerima donasi sukarela melalui platform pihak ketiga (Saweria dan Ko-Fi).<br><br>Donasi bersifat sepenuhnya sukarela dan tidak sah sebagai pembayaran untuk pembelian layanan atau fitur premium.<br><br>Anda mengakui bahwa transaksi donasi ditangani oleh pihak ketiga, dan TacoPDF tidak menyimpan data keuangan Anda.<br><br>Segala donasi yang telah diberikan bersifat final dan tidak dapat dikembalikan (non-refundable) dengan alasan apa pun.<br><br>TacoPDF bukan lembaga amal resmi; donasi tidak dapat digunakan untuk pengurangan pajak.",
    "tos.p6.title": "6. Batasan Tanggung Jawab",
    "tos.p6.text": "Sejauh yang diizinkan oleh hukum, dalam keadaan apa pun TacoPDF, pengembang, afiliasi, atau platform pemrosesan donasi kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial. Hal ini mencakup, namun tidak terbatas pada: kehilangan data, kerusakan file, gangguan bisnis, kegagalan transaksi donasi, atau kerugian finansial yang timbul dari penggunaan atau ketidakmampuan Anda dalam menggunakan layanan kami. Anda bertanggung jawab penuh untuk mencadangkan (backup) dokumen asli Anda sebelum melakukan pemrosesan.",
    "tos.p7.title": "7. Modifikasi Layanan & Ketentuan",
    "tos.p7.text": "Kami berhak untuk mengubah, memperbarui, menangguhkan, atau menghentikan fitur apa pun dari TacoPDF (termasuk mekanisme donasi) kapan saja tanpa pemberitahuan sebelumnya. Kami juga berhak merevisi Ketentuan Layanan ini secara berkala. Penggunaan berkelanjutan atas situs ini setelah adanya perubahan merupakan bentuk persetujuan Anda terhadap persyaratan yang diperbarui.",
    "tos.p8.title": "8. Hukum yang Mengatur",
    "tos.p8.text": "Ketentuan Layanan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia, tanpa memperhatikan pertentangan prinsip-prinsip hukum.",
    "tos.p9.title": "9. Hubungi Kami",
    "tos.p9.text": "Jika Anda memiliki pertanyaan hukum, kekhawatiran, atau membutuhkan klarifikasi mengenai Ketentuan Layanan ini, silakan hubungi tim kami melalui halaman <a href=\\"/id/contact\\" class=\\"text-primary underline\\">Hubungi Dukungan</a>."`,

  "es": `"tos.doc_title": "Términos de Servicio",
    "tos.intro": "Bienvenido a TacoPDF. Al acceder o utilizar nuestro sitio web y el software client-side, usted acepta estar legalmente vinculado a estos Términos de Servicio. Por favor, léalos detenidamente. Si no está de acuerdo con estos términos, le rogamos que no utilice nuestros servicios.",
    "tos.p1.title": "1. Aceptación de los Términos y Uso Lícito",
    "tos.p1.text": "Usted acepta utilizar nuestras herramientas de manipulación de PDF de manera responsable y en total cumplimiento de las leyes aplicables. Queda estrictamente prohibido utilizar TacoPDF para facilitar actividades ilegales, fraude, falsificación de documentos, manipulación ilícita de documentos o la infracción de los derechos de propiedad intelectual de terceros. Cualquier consecuencia legal derivada del mal uso de esta herramienta es de su exclusiva responsabilidad como usuario.",
    "tos.p2.title": "2. Arquitectura de Procesamiento Local (Client-Side)",
    "tos.p2.text": "Usted comprende y acepta que TacoPDF opera mediante una moderna arquitectura client-side. Esto significa que los documentos que usted procesa nunca se cargan en nuestros servidores. Todo el proceso de manipulación de archivos ocurre exclusivamente en la memoria del navegador de su dispositivo. Por lo tanto, la confidencialidad y la seguridad de los documentos físicos durante el proceso están completamente bajo su control.",
    "tos.p3.title": "3. Derechos de Propiedad Intelectual y Titularidad de los Documentos",
    "tos.p3.text": "La marca TacoPDF, la interfaz de usuario (UI), los logotipos, el diseño gráfico y la base de código del frontend son nuestra propiedad intelectual exclusiva. Sin embargo, no reclamamos ninguna titularidad sobre los documentos PDF que usted procese. Todos los derechos de autor, la confidencialidad y los derechos de propiedad intelectual de sus archivos siguen siendo totalmente suyos.",
    "tos.p4.title": "4. Renuncia de Garantías (Disclaimer of Warranties)",
    "tos.p4.text": "Los servicios de TacoPDF se proporcionan \\"tal cual\\" (as is) y \\"según disponibilidad\\" (as available) sin ninguna garantía, ya sea expresa o implícita. Debido a que nuestra herramienta opera de manera puramente local, el rendimiento y los resultados del procesamiento dependen en gran medida de las capacidades de memoria, el navegador y las especificaciones de su dispositivo. No garantizamos que este servicio esté 100% libre de errores técnicos, que los archivos no sufran fallos parciales durante el procesamiento o que el resultado de la conversión sea siempre perfecto según sus expectativas.",
    "tos.p5.title": "5. Donaciones Voluntarias y Política de No Reembolso (No-Refund)",
    "tos.p5.text": "TacoPDF es un servicio gratuito. Para apoyar los costos operativos del servidor y el desarrollo, aceptamos donaciones voluntarias a través de plataformas de terceros (Saweria y Ko-Fi).<br><br>Las donaciones son completamente voluntarias y no son válidas como pago por la compra de servicios o funciones premium.<br><br>Usted reconoce que las transacciones de donación son manejadas por terceros, y que TacoPDF no almacena sus datos financieros.<br><br>Todas las donaciones realizadas son definitivas y no reembolsables (non-refundable) bajo ningún concepto.<br><br>TacoPDF no es una organización benéfica oficial; las donaciones no pueden ser utilizadas para deducciones fiscales.",
    "tos.p6.title": "6. Limitación de Responsabilidad",
    "tos.p6.text": "En la medida máxima permitida por la ley, en ningún caso TacoPDF, sus desarrolladores, afiliados o nuestras plataformas de procesamiento de donaciones serán responsables de ningún daño directo, indirecto, incidental, especial o consecuente. Esto incluye, pero no se limita a: pérdida de datos, corrupción de archivos, interrupción del negocio, fallos en las transacciones de donación o pérdidas financieras que surjan del uso o de la imposibilidad de utilizar nuestros servicios. Usted es el único responsable de hacer copias de seguridad (backup) de sus documentos originales antes del procesamiento.",
    "tos.p7.title": "7. Modificación de Servicios y Términos",
    "tos.p7.text": "Nos reservamos el derecho de modificar, actualizar, suspender o descontinuar cualquier función de TacoPDF (incluyendo el mecanismo de donación) en cualquier momento sin previo aviso. También nos reservamos el derecho de revisar periódicamente estos Términos de Servicio. El uso continuado de este sitio tras dichas modificaciones constituye su aceptación de los términos actualizados.",
    "tos.p8.title": "8. Ley Aplicable",
    "tos.p8.text": "Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes de la República de Indonesia, sin dar efecto a ningún principio de conflictos de leyes.",
    "tos.p9.title": "9. Contáctenos",
    "tos.p9.text": "Si tiene alguna pregunta legal, inquietud o necesita aclaraciones sobre estos Términos de Servicio, comuníquese con nuestro equipo a través de la página de <a href=\\"/es/contact\\" class=\\"text-primary underline\\">Contactar Soporte</a>."`,

  "fr": `"tos.doc_title": "Conditions d'Utilisation",
    "tos.intro": "Bienvenue sur TacoPDF. En accédant à notre site Web et à notre logiciel client-side ou en les utilisant, vous acceptez d'être légalement lié par ces Conditions d'Utilisation. Veuillez les lire attentivement. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
    "tos.p1.title": "1. Acceptation des Conditions et Utilisation Légale",
    "tos.p1.text": "Vous acceptez d'utiliser nos outils de manipulation de PDF de manière responsable et en totale conformité avec les lois applicables. Il vous est strictement interdit d'utiliser TacoPDF pour faciliter des activités illégales, des fraudes, la falsification de documents, la manipulation illicite de documents ou la violation des droits de propriété intellectuelle de tiers. Toute conséquence juridique résultant d'une mauvaise utilisation de cet outil relève de votre seule responsabilité en tant qu'utilisateur.",
    "tos.p2.title": "2. Architecture de Traitement Local (Client-Side)",
    "tos.p2.text": "Vous comprenez et acceptez que TacoPDF fonctionne en utilisant une architecture client-side moderne. Cela signifie que les documents que vous traitez ne sont jamais téléversés sur nos serveurs. L'ensemble du processus de manipulation des fichiers se déroule exclusivement dans la mémoire du navigateur de votre appareil. Par conséquent, la confidentialité et la sécurité des documents physiques pendant le processus restent entièrement sous votre contrôle.",
    "tos.p3.title": "3. Droits de Propriété Intellectuelle et Propriété des Documents",
    "tos.p3.text": "L'image de marque de TacoPDF, l'interface utilisateur (UI), les logos, la conception graphique et la base de code frontend constituent notre propriété intellectuelle exclusive. Cependant, nous ne revendiquons aucun droit de propriété sur les documents PDF que vous traitez. Tous les droits d'auteur, la confidentialité et les droits de propriété intellectuelle sur vos fichiers restent entièrement les vôtres.",
    "tos.p4.title": "4. Exclusion de Garanties (Disclaimer of Warranties)",
    "tos.p4.text": "Les services de TacoPDF sont fournis \\"en l'état\\" (as is) et \\"selon la disponibilité\\" (as available) sans aucune garantie, expresse ou implicite. Étant donné que notre outil fonctionne de manière purement locale, les performances et les résultats du traitement dépendent fortement des capacités de mémoire, du navigateur et des spécifications de votre appareil. Nous ne garantissons pas que ce service sera exempt d'erreurs techniques à 100 %, que les fichiers ne subiront pas de dysfonctionnement partiel pendant le traitement, ou que le résultat de la conversion correspondra toujours parfaitement à vos attentes.",
    "tos.p5.title": "5. Dons Volontaires et Politique de Non-Remboursement (No-Refund)",
    "tos.p5.text": "TacoPDF est un service gratuit. Pour soutenir les coûts d'exploitation des serveurs et le développement, nous acceptons des dons volontaires via des plateformes tierces (Saweria et Ko-Fi).<br><br>Les dons sont entièrement volontaires et ne sont pas valables comme paiement pour l'achat de services ou de fonctionnalités premium.<br><br>Vous reconnaissez que les transactions de dons sont gérées par des tiers et que TacoPDF ne stocke pas vos données financières.<br><br>Tout don effectué est définitif et non remboursable (non-refundable) pour quelque raison que ce soit.<br><br>TacoPDF n'est pas une organisation caritative officielle ; les dons ne peuvent pas être utilisés pour des déductions fiscales.",
    "tos.p6.title": "6. Limitation de Responsabilité",
    "tos.p6.text": "Dans toute la mesure permise par la loi, TacoPDF, ses développeurs, ses affiliés ou nos plateformes de traitement des dons ne pourront en aucun cas être tenus responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs. Cela inclut, sans s'y limiter : la perte de données, la corruption de fichiers, l'interruption des activités, l'échec des transactions de dons ou les pertes financières résultant de votre utilisation ou de votre incapacité à utiliser nos services. Vous êtes seul responsable de la sauvegarde (backup) de vos documents originaux avant de les traiter.",
    "tos.p7.title": "7. Modification des Services et des Conditions",
    "tos.p7.text": "Nous nous réservons le droit de modifier, mettre à jour, suspendre ou interrompre toute fonctionnalité de TacoPDF (y compris le mécanisme de don) à tout moment sans préavis. Nous nous réservons également le droit de réviser périodiquement ces Conditions d'Utilisation. Votre utilisation continue de ce site après toute modification constitue votre acceptation des conditions mises à jour.",
    "tos.p8.title": "8. Droit Applicable",
    "tos.p8.text": "Ces Conditions d'Utilisation sont régies et interprétées conformément aux lois de la République d'Indonésie, sans tenir compte de ses principes de conflits de lois.",
    "tos.p9.title": "9. Nous Contacter",
    "tos.p9.text": "Si vous avez des questions d'ordre juridique, des préoccupations ou si vous avez besoin d'éclaircissements concernant ces Conditions d'Utilisation, veuillez contacter notre équipe via la page <a href=\\"/fr/contact\\" class=\\"text-primary underline\\">Contacter l'Assistance</a>."`,

  "de": `"tos.doc_title": "Nutzungsbedingungen",
    "tos.intro": "Willkommen bei TacoPDF. Durch den Zugriff auf oder die Nutzung unserer Website und Client-Side-Software erklären Sie sich damit einverstanden, rechtlich an diese Nutzungsbedingungen gebunden zu sein. Bitte lesen Sie diese sorgfältig durch. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.",
    "tos.p1.title": "1. Annahme der Bedingungen & Rechtmäßige Nutzung",
    "tos.p1.text": "Sie stimmen zu, unsere PDF-Bearbeitungstools verantwortungsvoll und in voller Übereinstimmung mit den geltenden Gesetzen zu nutzen. Es ist Ihnen strengstens untersagt, TacoPDF zu nutzen, um illegale Aktivitäten, Betrug, Dokumentenfälschung, unrechtmäßige Dokumentenmanipulation oder die Verletzung der geistigen Eigentumsrechte Dritter zu erleichtern. Jegliche rechtlichen Konsequenzen, die sich aus dem Missbrauch dieses Tools ergeben, liegen allein in Ihrer Verantwortung als Nutzer.",
    "tos.p2.title": "2. Lokale Verarbeitungsarchitektur (Client-Side)",
    "tos.p2.text": "Sie verstehen und stimmen zu, dass TacoPDF eine moderne Client-Side-Architektur verwendet. Das bedeutet, dass die von Ihnen verarbeiteten Dokumente niemals auf unsere Server hochgeladen werden. Der gesamte Dateibearbeitungsprozess findet ausschließlich im Speicher des Browsers auf Ihrem Gerät statt. Daher bleiben die Vertraulichkeit und Sicherheit der physischen Dokumente während des Vorgangs vollständig unter Ihrer Kontrolle.",
    "tos.p3.title": "3. Geistige Eigentumsrechte & Dokumenteneigentum",
    "tos.p3.text": "Die Marke TacoPDF, die Benutzeroberfläche (UI), die Logos, das Grafikdesign und die Frontend-Codebasis sind unser ausschließliches geistiges Eigentum. Wir erheben jedoch keinen Anspruch auf das Eigentum an den von Ihnen verarbeiteten PDF-Dokumenten. Alle Urheberrechte, die Vertraulichkeit und die geistigen Eigentumsrechte an Ihren Dateien verbleiben vollständig bei Ihnen.",
    "tos.p4.title": "4. Haftungsausschluss (Disclaimer of Warranties)",
    "tos.p4.text": "Die Dienste von TacoPDF werden \\"wie besehen\\" (as is) und \\"wie verfügbar\\" (as available) ohne jegliche ausdrückliche oder stillschweigende Garantie zur Verfügung gestellt. Da unser Tool rein lokal funktioniert, hängen die Leistung und die Verarbeitungsergebnisse stark von der Speicherkapazität, dem Browser und den Spezifikationen Ihres Geräts ab. Wir garantieren nicht, dass dieser Dienst zu 100 % frei von technischen Fehlern ist, dass Dateien während der Verarbeitung keine teilweisen Fehlfunktionen aufweisen oder dass das Konvertierungsergebnis immer perfekt Ihren Erwartungen entspricht.",
    "tos.p5.title": "5. Freiwillige Spenden & Keine-Rückerstattungs-Richtlinie (No-Refund)",
    "tos.p5.text": "TacoPDF ist ein kostenloser Dienst. Zur Unterstützung der Serverbetriebskosten und der Entwicklung akzeptieren wir freiwillige Spenden über Plattformen von Drittanbietern (Saweria und Ko-Fi).<br><br>Spenden sind völlig freiwillig und gelten nicht als Zahlung für den Kauf von Premium-Diensten oder -Funktionen.<br><br>Sie erkennen an, dass Spendentransaktionen von Dritten abgewickelt werden und dass TacoPDF Ihre Finanzdaten nicht speichert.<br><br>Alle getätigten Spenden sind endgültig und können aus keinem Grund zurückerstattet werden (non-refundable).<br><br>TacoPDF ist keine offizielle wohltätige Organisation; Spenden können nicht steuerlich abgesetzt werden.",
    "tos.p6.title": "6. Haftungsbeschränkung",
    "tos.p6.text": "Soweit gesetzlich zulässig, haften TacoPDF, seine Entwickler, verbundene Unternehmen oder unsere Spendenverarbeitungsplattformen in keinem Fall für direkte, indirekte, zufällige, besondere oder Folgeschäden. Dies umfasst, ist aber nicht beschränkt auf: Datenverlust, Dateibeschädigung, Betriebsunterbrechungen, fehlgeschlagene Spendentransaktionen oder finanzielle Verluste, die aus Ihrer Nutzung oder der Unmöglichkeit der Nutzung unserer Dienste resultieren. Sie sind allein dafür verantwortlich, Ihre Originaldokumente vor der Verarbeitung zu sichern (Backup).",
    "tos.p7.title": "7. Änderung der Dienste & Bedingungen",
    "tos.p7.text": "Wir behalten uns das Recht vor, Funktionen von TacoPDF (einschließlich des Spendenmechanismus) jederzeit und ohne vorherige Ankündigung zu ändern, zu aktualisieren, auszusetzen oder einzustellen. Wir behalten uns außerdem das Recht vor, diese Nutzungsbedingungen regelmäßig zu überarbeiten. Ihre fortgesetzte Nutzung der Website nach etwaigen Änderungen stellt Ihre Zustimmung zu den aktualisierten Bedingungen dar.",
    "tos.p8.title": "8. Geltendes Recht",
    "tos.p8.text": "Diese Nutzungsbedingungen unterliegen den Gesetzen der Republik Indonesien und werden in Übereinstimmung mit diesen ausgelegt, ohne Rücksicht auf die Grundsätze des Kollisionsrechts.",
    "tos.p9.title": "9. Kontaktiere uns",
    "tos.p9.text": "Wenn Sie rechtliche Fragen oder Bedenken haben oder eine Klärung bezüglich dieser Nutzungsbedingungen benötigen, kontaktieren Sie unser Team bitte über die Seite <a href=\\"/de/contact\\" class=\\"text-primary underline\\">Support kontaktieren</a>."`,

  "pt": `"tos.doc_title": "Termos de Serviço",
    "tos.intro": "Bem-vindo ao TacoPDF. Ao acessar ou usar nosso site e software client-side, você concorda em ficar legalmente vinculado a estes Termos de Serviço. Por favor, leia-os com atenção. Se você não concordar com estes termos, por favor, não use nossos serviços.",
    "tos.p1.title": "1. Aceitação dos Termos e Uso Legal",
    "tos.p1.text": "Você concorda em usar nossas ferramentas de manipulação de PDF de forma responsável e em total conformidade com as leis aplicáveis. Você é estritamente proibido de usar o TacoPDF para facilitar atividades ilegais, fraude, falsificação de documentos, manipulação ilícita de documentos ou a violação de direitos de propriedade intelectual de terceiros. Quaisquer consequências legais resultantes do uso indevido desta ferramenta são de sua exclusiva responsabilidade como usuário.",
    "tos.p2.title": "2. Arquitetura de Processamento Local (Client-Side)",
    "tos.p2.text": "Você compreende e concorda que o TacoPDF opera utilizando uma moderna arquitetura client-side. Isso significa que os documentos que você processa nunca são enviados para os nossos servidores. Todo o processo de manipulação de arquivos ocorre exclusivamente na memória do navegador do seu dispositivo. Portanto, a confidencialidade e a segurança dos documentos físicos durante o processo permanecem inteiramente sob o seu controle.",
    "tos.p3.title": "3. Direitos de Propriedade Intelectual e Propriedade de Documentos",
    "tos.p3.text": "A marca TacoPDF, a interface de usuário (UI), os logotipos, o design gráfico e a base de código frontend são de nossa exclusiva propriedade intelectual. No entanto, não reivindicamos qualquer propriedade sobre os documentos PDF que você processa. Todos os direitos autorais, confidencialidade e direitos de propriedade intelectual de seus arquivos permanecem inteiramente seus.",
    "tos.p4.title": "4. Isenção de Garantias (Disclaimer of Warranties)",
    "tos.p4.text": "Os serviços do TacoPDF são fornecidos \\"no estado em que se encontram\\" (as is) e \\"conforme disponíveis\\" (as available) sem quaisquer garantias, sejam expressas ou implícitas. Como a nossa ferramenta opera de forma puramente local, o desempenho e os resultados do processamento dependem altamente das capacidades de memória, do navegador e das especificações do seu dispositivo. Não garantimos que este serviço estará 100% livre de erros técnicos, que os arquivos não sofrerão mau funcionamento parcial durante o processamento, ou que a saída da conversão sempre atenderá perfeitamente às suas expectativas.",
    "tos.p5.title": "5. Doações Voluntárias e Política de Não Reembolso (No-Refund)",
    "tos.p5.text": "O TacoPDF é um serviço gratuito. Para ajudar com os custos operacionais de servidores e desenvolvimento, aceitamos doações voluntárias através de plataformas de terceiros (Saweria e Ko-Fi).<br><br>As doações são inteiramente voluntárias e não são válidas como pagamento pela compra de serviços ou recursos premium.<br><br>Você reconhece que as transações de doação são tratadas por terceiros e que o TacoPDF não armazena os seus dados financeiros.<br><br>Todas as doações feitas são definitivas e não reembolsáveis (non-refundable) por qualquer motivo.<br><br>O TacoPDF não é uma instituição de caridade oficial; as doações não podem ser usadas para deduções fiscais.",
    "tos.p6.title": "6. Limitação de Responsabilidade",
    "tos.p6.text": "Na extensão máxima permitida por lei, em nenhum caso o TacoPDF, os seus desenvolvedores, afiliados ou as nossas plataformas de processamento de doações serão responsabilizados por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes. Isto inclui, mas não se limita a: perda de dados, corrupção de arquivos, interrupção de negócios, falha nas transações de doação ou perdas financeiras decorrentes do uso ou da incapacidade de usar os nossos serviços. Você é o único responsável por fazer cópias de segurança (backup) de seus documentos originais antes de realizar o processamento.",
    "tos.p7.title": "7. Modificação de Serviços e Termos",
    "tos.p7.text": "Reservamo-nos o direito de modificar, atualizar, suspender ou descontinuar qualquer recurso do TacoPDF (incluindo o mecanismo de doação) a qualquer momento, sem aviso prévio. Também nos reservamos o direito de revisar periodicamente estes Termos de Serviço. O uso contínuo deste site após quaisquer alterações constitui a sua aceitação dos termos atualizados.",
    "tos.p8.title": "8. Lei Aplicável",
    "tos.p8.text": "Estes Termos de Serviço serão regidos e interpretados de acordo com as leis da República da Indonésia, sem considerar os seus conflitos de princípios legais.",
    "tos.p9.title": "9. Contate-nos",
    "tos.p9.text": "Se você tiver quaisquer dúvidas legais, preocupações ou precisar de esclarecimentos sobre estes Termos de Serviço, por favor, contate a nossa equipe através da página de <a href=\\"/pt/contact\\" class=\\"text-primary underline\\">Contatar Suporte</a>."`,

  "ja": `"tos.doc_title": "利用規約",
    "tos.intro": "TacoPDFへようこそ。当ウェブサイトおよびクライアントサイド（Client-Side）ソフトウェアにアクセスまたは使用することにより、お客様は本利用規約に法的に拘束されることに同意したものとみなされます。本規約を注意深くお読みください。これらの条件に同意されない場合は、当社のサービスをご利用にならないでください。",
    "tos.p1.title": "1. 規約の同意および適法な利用",
    "tos.p1.text": "お客様は、当社のPDF操作ツールを責任を持って、適用される法令を完全に遵守して使用することに同意するものとします。違法行為、詐欺、文書の偽造、違法な文書の改ざん、または第三者の知的財産権の侵害を助長するためにTacoPDFを利用することは固く禁じられています。本ツールの不正使用から生じるいかなる法的結果も、ユーザーであるお客様の全責任となります。",
    "tos.p2.title": "2. ローカル処理アーキテクチャ（Client-Side）",
    "tos.p2.text": "お客様は、TacoPDFが最新のクライアントサイド・アーキテクチャを使用して運用されていることを理解し、同意するものとします。これは、お客様が処理する文書が当社のサーバーにアップロードされることは決してないことを意味します。ファイル操作のすべてのプロセスは、お客様のデバイス上のブラウザのメモリ内で排他的に行われます。したがって、処理中の物理的な文書の機密性および安全性は、完全にお客様の管理下に置かれます。",
    "tos.p3.title": "3. 知的財産権および文書の所有権",
    "tos.p3.text": "TacoPDFのブランディング、ユーザーインターフェース（UI）、ロゴ、グラフィックデザイン、およびフロントエンドのコードベースは、当社の独占的な知的財産です。ただし、当社はお客様が処理するPDF文書の所有権を一切主張しません。お客様のファイルに関するすべての著作権、機密性、および知的財産権は、完全にお客様に帰属します。",
    "tos.p4.title": "4. 保証の否認（Disclaimer of Warranties）",
    "tos.p4.text": "TacoPDFのサービスは、明示または黙示を問わず、いかなる種類の保証もなく「現状有姿（as is）」および「提供可能な範囲（as available）」で提供されます。当社のツールは純粋にローカルで動作するため、パフォーマンスおよび処理結果は、お客様のデバイスのメモリ容量、ブラウザ、および仕様に大きく依存します。当社は、本サービスに技術的なエラーが100%ないこと、処理中にファイルが部分的な誤動作を起こさないこと、または変換の出力が常にお客様の期待を完全に満たすことを保証するものではありません。",
    "tos.p5.title": "5. 任意の寄付および返金不可（No-Refund）ポリシー",
    "tos.p5.text": "TacoPDFは無料のサービスです。サーバーの運営費および開発費をサポートするために、サードパーティのプラットフォーム（SaweriaおよびKo-Fi）を通じて任意の寄付を受け付けています。<br><br>寄付は完全に任意であり、プレミアムサービスまたは機能の購入のための支払いとして有効ではありません。<br><br>お客様は、寄付の取引がサードパーティによって処理されること、およびTacoPDFがお客様の財務データを保存しないことを承認するものとします。<br><br>行われたすべての寄付は最終的なものであり、いかなる理由であっても返金不可（non-refundable）です。<br><br>TacoPDFは公式の慈善団体ではありません。寄付を税控除の対象にすることはできません。",
    "tos.p6.title": "6. 責任の制限",
    "tos.p6.text": "法律で認められる最大限の範囲において、TacoPDF、その開発者、関連会社、または当社の寄付処理プラットフォームは、直接的、間接的、偶発的、特別、または派生的な損害について、いかなる場合も責任を負わないものとします。これには、データの損失、ファイルの破損、事業の中断、寄付取引の失敗、または当社のサービスの利用もしくは利用不能から生じる経済的損失が含まれますが、これらに限定されません。処理を実行する前に、元の文書のバックアップ（backup）を作成することは、お客様の全責任となります。",
    "tos.p7.title": "7. サービスおよび規約の変更",
    "tos.p7.text": "当社は、TacoPDFのいかなる機能（寄付メカニズムを含む）も、事前の通知なしにいつでも変更、更新、一時停止、または中止する権利を留保します。また、当社は本利用規約を定期的に改定する権利を留保します。変更後も引き続き本サイトを利用することにより、お客様は更新された条件に同意したものとみなされます。",
    "tos.p8.title": "8. 準拠法",
    "tos.p8.text": "本利用規約は、法の抵触に関する原則にかかわらず、インドネシア共和国の法律に準拠し、同法に従って解釈されるものとします。",
    "tos.p9.title": "9. お問い合わせ",
    "tos.p9.text": "本利用規約に関する法的なご質問、懸念事項、または説明が必要な場合は、<a href=\\"/ja/contact\\" class=\\"text-primary underline\\">サポートへのお問い合わせ</a>ページより当社チームまでご連絡ください。"`,
};

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

for (const lang of Object.keys(replacements)) {
    const langKey = '"' + lang + '": {';
    const langStart = content.indexOf(langKey);
    if (langStart === -1) {
        console.log("Language not found: " + lang);
        continue;
    }
    
    const startIdx = content.indexOf('"tos.doc_title":', langStart);
    if (startIdx === -1) {
        console.log("tos.doc_title not found for " + lang);
        continue;
    }
    
    // Find the next section in the file (privacy.doc_title)
    let endKeyIdx = content.indexOf('"privacy.doc_title":', startIdx);
    if (endKeyIdx !== -1) {
        // Find the comma or newline right before privacy.doc_title
        content = content.substring(0, startIdx) + replacements[lang] + ",\n    " + content.substring(endKeyIdx);
        console.log("Replaced successfully for " + lang);
    } else {
        console.log("End key not found for " + lang);
    }
}

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log("DONE");
