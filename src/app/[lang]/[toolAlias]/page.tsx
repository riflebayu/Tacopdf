import { Suspense } from 'react';
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
  
  const descriptionKey = `tools.${tool.id.replace(/-/g, '_')}.description`;
  const translatedDescription = dict[descriptionKey as keyof typeof dict] || TRANSLATIONS['en'][descriptionKey as keyof typeof TRANSLATIONS['en']] || tool.description;

  // Extract How To Use steps
  const howToSteps: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const key = `tool.${tool.id.replace(/-/g, '_')}.howto.${i}`;
    const step = dict[key as keyof typeof dict] || TRANSLATIONS['en'][key as keyof typeof TRANSLATIONS['en']];
    if (step && step !== key) howToSteps.push(step);
  }
  if (howToSteps.length === 0) {
    howToSteps.push(
      dict['tool.default.howto.1' as keyof typeof dict] || 'Select the PDF file you wish to process.',
      dict['tool.default.howto.2' as keyof typeof dict] || 'Configure the parameters in the settings panel.',
      dict['tool.default.howto.3' as keyof typeof dict] || 'Click the action button to execute the tool locally.'
    );
  }

  // Extract Tips
  const tips: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const key = `tool.${tool.id.replace(/-/g, '_')}.tips.${i}`;
    const tip = dict[key as keyof typeof dict] || TRANSLATIONS['en'][key as keyof typeof TRANSLATIONS['en']];
    if (tip && tip !== key) tips.push(tip);
  }
  if (tips.length === 0) {
    tips.push(
      dict['tool.default.tips.1' as keyof typeof dict] || 'Preview your output before downloading.',
      dict['tool.default.tips.2' as keyof typeof dict] || 'All processing happens locally for maximum privacy.',
      dict['tool.default.tips.3' as keyof typeof dict] || 'Use custom output naming to keep files organized.'
    );
  }

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

        {/* Server Rendered Tool Description */}
        <div className="mb-8 p-6 lg:p-8 bg-surface-container border border-outline-variant/30 rounded-2xl shadow-sm">
           <h2 className="text-xl font-bold text-primary-container flex items-center gap-2 border-b border-outline-variant pb-3">
             <TacoIcon name={tool.icon} size={24} />
             {translatedName}
           </h2>
           <p className="mt-4 text-on-surface-variant leading-relaxed">
             {translatedDescription}
           </p>
        </div>

        {/* Client-Side PDF Logic isolated to WorkspaceWrapper */}
        <Suspense fallback={<div className="w-full h-64 flex items-center justify-center">Memuat Workspace...</div>}>
          <WorkspaceWrapper tool={tool} />
        </Suspense>
        
        {/* Server Rendered FAQ / Tips Section */}
        <div className="mt-12 border border-outline-variant bg-surface-container rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-xl font-bold text-primary-container flex items-center gap-2 border-b border-outline-variant pb-3">
            <TacoIcon name="help-circle" size={22} className="text-primary-container" />
            {dict['workspace.how_to_use' as keyof typeof dict] || 'How to Use'} - {translatedName}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-on-surface-variant text-sm leading-relaxed">
            {/* How to Use */}
            <div className="space-y-4">
              <h3 className="font-bold text-on-surface text-base flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary text-xs font-mono font-bold">1</span>
                {dict['workspace.how_to_title' as keyof typeof dict] || 'Instructions for'} {translatedName}
              </h3>
              <ol className="list-decimal pl-5 space-y-2.5">
                {howToSteps.map((step, idx) => (
                  <li key={idx} className="marker:text-primary-container marker:font-bold">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Professional Tips */}
            <div className="space-y-4">
              <h3 className="font-bold text-on-surface text-base flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary text-xs font-mono font-bold">2</span>
                {dict['workspace.tips_title' as keyof typeof dict] || 'Professional Tips'}
              </h3>
              <ul className="list-disc pl-5 space-y-2.5">
                {tips.map((tip, idx) => (
                  <li key={idx} className="marker:text-primary-container">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SEO Article - Passes lang explicitly to prevent hydration issues */}
        <ToolSeoArticle toolId={tool.id} lang={lang} />
      </div>
    </div>
  );
}
