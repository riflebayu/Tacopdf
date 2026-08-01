import { redirect } from 'next/navigation';

const LANGS = ['en','id','es','fr','de','pt','ja'];

export async function generateStaticParams() {
  return LANGS.map(lang => ({ lang }));
}

export default async function MergeLegacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  // Preserve old /merge Google index URLs — 301 redirect to canonical /merge-pdf
  const target = lang === 'en' ? '/merge-pdf' : `/${lang}/merge-pdf`;
  redirect(target);
}
