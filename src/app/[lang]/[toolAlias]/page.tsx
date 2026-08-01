import { getDictionary } from '@/dictionaries';
import { Metadata } from 'next';
import WorkspaceWrapper from '@/components/pdf-tools/WorkspaceWrapper';
import { TOOLS, TOOL_ALIASES } from '@/data/tools';

type Props = {
  params: Promise<{ lang: string; toolAlias: string }>
};

export async function generateStaticParams() {
  const languages = ['en', 'id', 'es', 'fr', 'de', 'pt', 'ja'];
  
  // Note: we might have an issue if TOOL_ALIASES is imported from a "use client" file.
  // But Next.js can usually evaluate static params if the file has no complex runtime react hooks.
  const aliases = Object.keys(TOOL_ALIASES || {});
  const ids = (TOOLS || []).map(t => t.id);
  const allPaths = Array.from(new Set([...aliases, ...ids]));
  
  const params: any[] = [];
  for (const lang of languages) {
    for (const toolAlias of allPaths) {
      if (toolAlias) {
        params.push({ lang, toolAlias });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, toolAlias } = await params;
  return {
    title: `${toolAlias.replace(/-/g, ' ').toUpperCase()} - TacoPDF`,
  };
}

export default async function ToolPage({ params }: Props) {
  const { lang, toolAlias } = await params;

  // We find the correct tool based on alias
  const toolId = TOOL_ALIASES?.[toolAlias] || toolAlias;
  const tool = TOOLS?.find(t => t.id === toolId);

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <main className="flex min-h-screen flex-col w-full bg-background text-on-surface">
      <WorkspaceWrapper tool={tool} />
    </main>
  );
}
