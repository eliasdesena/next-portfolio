import type { Metadata } from 'next';
import { ThemeProvider } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'ELIAS DE SENA',
  description: 'Building worlds through code, scent & sound.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative">
        <ThemeProvider>{children}</ThemeProvider>
        {/* Site-wide noise overlay (always on top, scrollable) */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-full min-h-full z-[9999] mix-blend-luminosity opacity-5"
          style={{
            backgroundImage: "url('/img/noise.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        />
      </body>
    </html>
  );
} 