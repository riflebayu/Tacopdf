import { getDictionary } from '@/dictionaries';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  
  return {
    title: dict.merge.title,
    description: dict.merge.description,
  };
}

export default async function MergePage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-4">{dict.merge.title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-12">
        {dict.merge.description}
      </p>
      
      <div className="w-full max-w-4xl p-8 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">
          [ClientComponent ClientToolWrapper will be injected here with 'use client' and pdf-lib]
        </p>
      </div>
    </main>
  );
}
