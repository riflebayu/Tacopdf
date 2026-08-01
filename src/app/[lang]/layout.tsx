import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TacoPDF',
  description: 'Free & Secure Online PDF Tools',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }, { lang: 'es' }, { lang: 'fr' }, { lang: 'de' }, { lang: 'pt' }, { lang: 'ja' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayoutWrapper initialLang={lang}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
