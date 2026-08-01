import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';
import HomePageClient from '@/components/HomePageClient';

type Props = {
  params: Promise<{ lang: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  return {
    title: dict.home.title,
    description: dict.home.subtitle,
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  return <HomePageClient lang={lang} />;
}
