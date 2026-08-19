import React, { Suspense } from 'react';
import Workspace from '../Workspace';
import CompressWorkspace from './CompressWorkspace';
import OCRWorkspace from './OCRWorkspace';
import OrganizeWorkspace from './OrganizeWorkspace';
import { LanguageProvider } from '../../context/LanguageContext';

export default function WorkspaceWrapper(props: any) {
  return (
    <LanguageProvider initialLang={props.lang || 'en'}>
      <div className="w-full animate-fade-in">
        <Suspense fallback={
        <div className="w-full flex flex-col lg:flex-row gap-6 animate-pulse">
          <div className="lg:col-span-7 flex-1 border-2 border-dashed border-outline-variant/30 rounded-2xl h-80 bg-surface-container-low flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-surface-container-high rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-surface-container-high rounded mb-2"></div>
            <div className="h-10 w-32 bg-primary-container rounded-full mt-4"></div>
          </div>
          <div className="lg:col-span-5 w-full lg:w-80 h-80 bg-surface-container border border-outline-variant/30 rounded-2xl">
          </div>
        </div>
      }>
        {props.tool.id === 'compress' ? (
          <CompressWorkspace tool={props.tool} onBack={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }} />
        ) : props.tool.id === 'ocr' ? (
          <OCRWorkspace tool={props.tool} onBack={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }} />
        ) : props.tool.id === 'organize' ? (
          <OrganizeWorkspace tool={props.tool} onBack={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }} />
        ) : (
          <Workspace tool={props.tool} initialFiles={[]} onBack={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }} />
        )}
      </Suspense>
      </div>
    </LanguageProvider>
  );
}
