import sys

with open('src/data/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
  "en": """"privacy.doc_title": "Privacy Policy",
    "privacy.intro": "TacoPDF is fully committed to your privacy and data security. As a provider of free online PDF tools, we pioneer a local processing (Client-Side) architecture to guarantee maximum document protection. This Privacy Policy outlines how we protect your data when you use our services.",
    "privacy.p1.title": "1. 100% Local Processing (No Server Uploads)",
    "privacy.p1.text": "All file manipulations (such as Merge PDF, Split PDF, and other conversion formats) are processed exclusively within your device's browser memory using modern WebAssembly and JavaScript technologies. We never upload, store, read, or distribute your documents. Your PDF files never once touch or pass through TacoPDF servers. The confidentiality of your documents rests entirely in your hands.",
    "privacy.p2.title": "2. Use of Cookies & Local Preferences",
    "privacy.p2.text": "To provide a seamless and responsive user experience (UX), TacoPDF utilizes basic cookies stored in your browser. These cookies are extremely small and are solely responsible for saving your tool interface preferences (such as language selection or display settings). By continuing to use our services, you consent to the use of these essential cookies for your navigational convenience.",
    "privacy.p3.title": "3. Third-Party Advertising",
    "privacy.p3.text": "In order to continue providing these high-performance PDF services for free to the public, TacoPDF displays sponsored advertisements. Third-party vendors, including Google, use advertising cookies to serve ads based on your prior visits to this website or other websites on the internet. Google's use of advertising cookies enables it and its partners to serve ads that are most relevant to users to support the maintenance of our infrastructure.",
    "privacy.p4.title": "4. Control & Opt-out of Personalized Advertising",
    "privacy.p4.text": "You have full control over your advertising privacy. Users may opt-out of personalized advertising at any time by visiting <a href=\\"https://myadcenter.google.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"text-primary underline\\">Google Ads Settings</a>. Alternatively, you may also disable the use of cookies for interest-based advertising by third-party vendors via the <a href=\\"https://www.aboutads.info\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"text-primary underline\\">www.aboutads.info</a> website.",
    "privacy.p5.title": "5. Web Analytics and Log Files",
    "privacy.p5.text": "To ensure the website runs stably and continues to improve, we collect standard traffic analytics data. This data includes basic information such as browser type, time of visit, tool pages accessed, and anonymized IP addresses. It is strictly noted that this tracking is purely limited to web page interactions and absolutely does not track, collect, or have access to the contents of the PDF documents that you process locally on your device.",
    "privacy.p6.title": "6. Donations and Third-Party Payment Processing",
    "privacy.p6.text": "To support our operational costs and infrastructure development, TacoPDF accepts voluntary donations from users. The donation transaction process is handled entirely by secure third-party platforms, namely Saweria (for the Indonesian region) and Ko-Fi (for international).<br><br>TacoPDF never requests, processes, or stores your sensitive financial information (such as credit card numbers or banking details) on our servers. Any form of data you provide when making a donation transaction (such as name or email address) is governed by the Privacy Policy of the respective payment service providers.",
    "privacy.p7.title": "7. Contact the Support Team",
    "privacy.p7.text": "Your trust is our top priority. If you have any further questions, feedback, or concerns regarding these privacy protection practices, please contact our team at any time via the <a href=\\"/en/contact\\" class=\\"text-primary underline\\">Contact Support</a> page."""
}

lang = "en"
start_str = '"' + lang + '": {'
start_idx = content.find(start_str)

privacy_start = content.find('"privacy.doc_title":', start_idx)
end_key = content.find('"privacy.p6.text":', privacy_start)
end_line = content.find('\\n', end_key)

print(f"Start: {privacy_start}, End Key: {end_key}, End Line: {end_line}")

if privacy_start != -1 and end_line != -1:
    content = content[:privacy_start] + replacements[lang] + "," + content[end_line:]
    print("Replaced successfully")

with open('src/data/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)
