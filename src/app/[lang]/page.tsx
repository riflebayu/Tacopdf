import { getDictionary } from '@/dictionaries';
import { Metadata } from 'next';
import Banner from '@/components/Banner';
import ToolGrid from '@/components/ToolGrid';
import SEOSection from '@/components/SEOSection';
import FAQSection from '@/components/FAQSection';

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
  const dict = await getDictionary(lang as any);

  return (
    <main className="flex flex-col w-full bg-background">
      <Banner />
      
      {/* Hero Section */}
      <section className="pt-8 pb-12 md:pt-16 md:pb-24 px-4 text-center max-w-4xl mx-auto" id="beranda-atas">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-on-surface mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-sm">
          {dict.home.title}
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
          {dict.home.subtitle}
        </p>
      </section>

      <ToolGrid />
      <SEOSection />
      <FAQSection />
    </main>
  );
}
