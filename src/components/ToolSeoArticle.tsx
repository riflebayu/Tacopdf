import React from 'react';
import toolSeoData from '../data/toolSeoData.json';

interface ToolSeoArticleProps {
  toolId: string;
}

export const ToolSeoArticle: React.FC<ToolSeoArticleProps> = ({ toolId }) => {
  const content = (toolSeoData as Record<string, string>)[toolId];

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
