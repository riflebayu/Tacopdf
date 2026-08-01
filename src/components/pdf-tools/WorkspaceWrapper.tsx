"use client";
import dynamic from 'next/dynamic';

const Workspace = dynamic(() => import('@/components/Workspace'), { ssr: false });

export default function WorkspaceWrapper(props: any) {
  return (
    <div className="w-full">
      <Workspace tool={props.tool} initialFiles={[]} onBack={() => window.location.href = '/'} />
    </div>
  );
}
