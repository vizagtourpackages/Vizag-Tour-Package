import React from 'react';
import * as Icons from 'lucide-react';

export default function DynamicIcon({ name, size = 24, className = '' }: { name: string, size?: number, className?: string }) {
  // @ts-ignore
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon size={size} className={className} />;
}
