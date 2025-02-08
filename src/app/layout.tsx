import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Writely - Modern Markdown Blog Editor',
  description: 'A sophisticated markdown blog editor with SEO features and modern design',
  keywords: ['blog editor', 'markdown', 'SEO', 'content management', 'writing tool'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Premium grid pattern overlay */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950">
            <div
              className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/50 bg-[size:3rem_3rem] opacity-20"
              style={{
                maskImage: 'radial-gradient(circle at center, white, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at center, white, transparent 80%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-100/30 dark:from-primary-950/30 dark:to-primary-900/30" />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
