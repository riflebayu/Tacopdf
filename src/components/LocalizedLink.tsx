import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function LocalizedLink({ to, children, ...props }: LinkProps) {
  const { lang } = useLanguage();
  
  let targetPath = typeof to === 'string' ? to : to.pathname || '/';

  if (lang !== 'en') {
    targetPath = targetPath === '/' ? `/${lang}` : `/${lang}${targetPath}`;
  }

  return (
    <Link to={targetPath} {...props}>
      {children}
    </Link>
  );
}
