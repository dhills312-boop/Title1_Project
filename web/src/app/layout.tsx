import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Title I — Donation Platform',
  description:
    'Real classrooms. Real needs. Direct allocation to Title I schools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script src="/morph-paths.js" strategy="beforeInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/flubber@0.4.2/build/flubber.min.js"
          strategy="beforeInteractive"
        />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
