'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function LatestUpdatesWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Hide on homepage
  if (pathname === '/') {
    return null;
  }
  
  return <>{children}</>;
}
