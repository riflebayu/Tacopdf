import React from 'react';
import toolSeoData from '../data/toolSeoData.json';
import { useLanguage } from '../context/LanguageContext';

interface ToolSeoArticleProps {
  toolId: string;
}

export const ToolSeoArticle: React.FC<ToolSeoArticleProps> = ({ toolId }) => {
  const { language } = useLanguage();
  const toolData = (toolSeoData as Record<string, Record<string, string>>)[toolId];

  if (!toolData) return null;

  const content = toolData[language] || toolData['en'];

  if (!content) return null;

  return (
    <div className="w-full flex justify-center mt-12 mb-8 px-4 animate-fade-in">
      <article 
        className="w-full max-w-4xl bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 md:p-10 shadow-sm
                   [&>h3]:text-on-surface [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3:first-child]:mt-0 [&>h3]:mb-4
                   [&>p]:text-on-surface-variant [&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-5 [&>p:last-child]:mb-0
                   [&>p>strong]:text-primary [&>p>strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
