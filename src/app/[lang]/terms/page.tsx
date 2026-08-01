import StaticPageClient from '@/components/StaticPageClient';
import { Metadata } from 'next';

const LANGS = ['en','id','es','fr','de','pt','ja'];
export async function generateStaticParams() {
  return LANGS.map(lang => ({ lang }));
}
export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Terms of Service - TacoPDF', description: 'TacoPDF Terms of Service' };
}
export default async function Page() {
  return <StaticPageClient pageType="terms" />;
}
