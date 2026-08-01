import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import HomePageClient from '@/components/HomePageClient';
import { TRANSLATIONS } from '@/data/translations';

type Props = {
  params: Promise<{ lang: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] || TRANSLATIONS['en'];
  return {
    title: dict['home.title' as keyof typeof dict] || 'TacoPDF - Free & Secure Online PDF Tools',
    description: dict['home.subtitle' as keyof typeof dict] || 'Process PDFs locally in your browser. Maximum privacy and security.',
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  return <HomePageClient lang={lang} />;
}
