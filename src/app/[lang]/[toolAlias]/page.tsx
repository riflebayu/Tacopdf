import { Metadata } from 'next';
import WorkspaceWrapper from '@/components/pdf-tools/WorkspaceWrapper';
import { ToolSeoArticle } from '@/components/ToolSeoArticle';
import { TOOLS, TOOL_ALIASES } from '@/data/tools';

type Props = {
  params: Promise<{ lang: string; toolAlias: string }>
};

export async function generateStaticParams() {
  const languages = ['en', 'id', 'es', 'fr', 'de', 'pt', 'ja'];
  const aliases = Object.keys(TOOL_ALIASES || {});
  const ids = (TOOLS || []).map(t => t.id);
  const allPaths = Array.from(new Set([...aliases, ...ids]));
  const params: any[] = [];
  for (const lang of languages) {
    for (const toolAlias of allPaths) {
      if (toolAlias) params.push({ lang, toolAlias });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, toolAlias } = await params;
  const toolId = TOOL_ALIASES?.[toolAlias] || toolAlias;
  const tool = TOOLS?.find(t => t.id === toolId);
  const name = tool?.name || toolAlias.replace(/-/g, ' ');
  return {
    title: `${name} - TacoPDF`,
    description: tool?.description || `Process PDF with ${name} securely in your browser.`,
  };
}

export default async function ToolPage({ params }: Props) {
  const { lang, toolAlias } = await params;
  const toolId = TOOL_ALIASES?.[toolAlias] || toolAlias;
  const tool = TOOLS?.find(t => t.id === toolId);

  if (!tool) {
    return <div className="flex items-center justify-center min-h-screen text-on-surface">Tool not found</div>;
  }

  return (
    <div className="flex flex-col w-full bg-background text-on-surface min-h-screen">
      <WorkspaceWrapper tool={tool} />
      <ToolSeoArticle toolId={tool.id} />
    </div>
  );
}
