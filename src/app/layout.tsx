import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AstraProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Astra Academy — IT • AI • PROGRAMMING',
  description: "Astra Academy — O'zbek tilidagi zamonaviy dasturlash, sun'iy intellekt va texnologiya ta'lim platformasi Telegram Mini App.",
  icons: {
    icon: '/images/astra-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="dark">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-black text-white antialiased selection:bg-yellow-500/30 selection:text-yellow-200">
        <AstraProvider>{children}</AstraProvider>
      </body>
    </html>
  );
}
