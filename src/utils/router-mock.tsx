"use client";
import React, { useEffect, useState } from 'react';

export const useNavigate = () => {
  return (path: string, options?: { replace?: boolean }) => {
    if (typeof window !== 'undefined') {
      if (options?.replace) {
        window.history.replaceState(null, '', path);
        // Force a re-render or reload if we rely on full page reload in Astro
        window.location.replace(path);
      } else {
        window.location.href = path;
      }
    }
  };
};

export const useLocation = () => {
  const [loc, setLoc] = useState({ pathname: '/', search: '', hash: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoc({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      });
    }
  }, []);

  if (typeof window !== 'undefined') {
    return window.location;
  }
  return loc;
};

export const Navigate = ({ to, replace }: any) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (replace) window.location.replace(to);
      else window.location.href = to;
    }
  }, [to, replace]);
  return null;
};

export type LinkProps = {
  to?: any;
  href?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const Link = ({ to, href, children, ...props }: LinkProps) => {
  return <a href={to || href || '#'} {...props}>{children}</a>;
};
