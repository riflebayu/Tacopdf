// @ts-nocheck
"use client";
import { useEffect } from 'react';
import { useLocation } from '@/utils/router-mock';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
