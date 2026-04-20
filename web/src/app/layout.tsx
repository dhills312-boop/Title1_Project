import type { Metadata } from 'next';
import { EB_Garamond, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import NavBar from '@/components/NavBar';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

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
    <html lang="en" className={`${ebGaramond.variable} ${dmSans.variable}`}>
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
