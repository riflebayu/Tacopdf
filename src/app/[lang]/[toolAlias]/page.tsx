import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import WorkspaceWrapper from '@/components/pdf-tools/WorkspaceWrapper';
import { ToolSeoArticle } from '@/components/ToolSeoArticle';
import TacoIcon from '@/components/TacoIcon';
import { TOOLS, TOOL_ALIASES } from '@/data/tools';
import { TRANSLATIONS } from '@/data/translations';

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

  // Get translations directly on the server
  const dict = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] || TRANSLATIONS['en'];
  const toolNameKey = `tool_name.${tool.id.replace(/-/g, '_')}`;
  const translatedName = dict[toolNameKey as keyof typeof dict] || TRANSLATIONS['en'][toolNameKey as keyof typeof TRANSLATIONS['en']] || tool.name;

  return (
    <div className="flex flex-col w-full bg-background text-on-surface min-h-screen">
      <div id="workspace-top" className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 scroll-mt-24 w-full">
        {/* SEO Header - Server Rendered */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href={lang === 'en' ? '/' : `/${lang}`}
            className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/50 p-2.5 rounded-lg text-primary hover:text-primary-container transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2 mt-1">
              <TacoIcon name={tool.icon} size={72} className="text-primary-container" />
              {translatedName}
            </h1>
          </div>
        </div>

        {/* Client-Side PDF Logic isolated to WorkspaceWrapper */}
        <WorkspaceWrapper tool={tool} />
        
        {/* SEO Article - Passes lang explicitly to prevent hydration issues */}
        <ToolSeoArticle toolId={tool.id} lang={lang} />
      </div>
    </div>
  );
}
