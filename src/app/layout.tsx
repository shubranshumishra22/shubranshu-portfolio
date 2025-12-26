import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import '@/styles/globals.css';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Shubranshu',
  description: 'High-performing software engineer & ML researcher portfolio',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-midnight text-cloud antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
