import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
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
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <ThemeProvider>
          {/* Premium grid pattern overlay */}
          {/* Background with grid pattern and gradient */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-white dark:bg-slate-950">
              <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/50 bg-[size:3rem_3rem] opacity-20 bg-repeat" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-slate-100/30 dark:from-slate-950/30 dark:to-slate-900/30" />
            </div>
          </div>

          <div className="relative min-h-screen flex flex-col">
            <ThemeToggle />
            {children}
            <footer className="w-full py-4 px-6 border-t border-slate-200/50 dark:border-slate-800/50 backdrop-blur-lg bg-white/90 dark:bg-slate-950/90">
              <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
                Powered by{' '}
                <a
                  href="https://www.zenaclove.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Zenaclove IT Solutions
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
