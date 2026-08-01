"use client";
import { useRouter, usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { useEffect } from 'react';

export const useNavigate = () => {
  try {
    const router = useRouter();
    return (path: string) => router.push(path);
  } catch (e) {
    return (path: string) => { console.log('Mock Navigate:', path); }
  }
};

export const useLocation = () => {
  try {
    const pathname = usePathname();
    return { pathname: pathname || '/', search: '', hash: '' };
  } catch(e) {
    return { pathname: '/', search: '', hash: '' };
  }
};

export const Navigate = ({ to, replace }: any) => {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, router]);
  return null;
};

export const Link = ({ to, href, ...props }: LinkProps) => {
  return <NextLink href={to || href || '#'} {...props} />;
};
export type LinkProps = {
  to: any;
  href?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};
