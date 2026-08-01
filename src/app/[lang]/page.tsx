import { getDictionary } from '@/dictionaries';
import { Metadata } from 'next';

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">{dict.home.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl">
        {dict.home.subtitle}
      </p>
      <div className="mt-8">
        <p className="text-sm">Current Server-Side Rendered Locale: <strong>{lang}</strong></p>
      </div>
    </main>
  );
}
