declare module 'next-themes' {
  import { ComponentProps, ReactNode } from 'react';

  interface UseThemeProps {
    /** List of all available theme names */
    themes?: string[];
    /** Forced theme name for the current page */
    forcedTheme?: string;
    /** Whether to switch between dark and light themes based on prefers-color-scheme */
    enableSystem?: boolean;
    /** Disable all CSS transitions when switching themes */
    disableTransitionOnChange?: boolean;
    /** Whether to indicate to browsers which color scheme is used (dark or light) */
    enableColorScheme?: boolean;
    /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
    defaultTheme?: string;
    /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute prefix like `data-theme` or `data-mode`) */
    attribute?: string;
    /** Value applied when theme='dark' */
    value?: {
      dark?: string;
      light?: string;
      system?: string;
      [key: string]: string | undefined;
    };
  }

  interface ThemeProviderProps extends UseThemeProps {
    /** Child elements */
    children?: ReactNode;
  }

  type UseThemeReturn = {
    /** Update the theme */
    setTheme: (theme: string) => void;
    /** Active theme name */
    theme: string | undefined;
    /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, returns undefined */
    systemTheme: 'dark' | 'light' | undefined;
    /** If the theme is ready to be used */
    mounted: boolean;
  };

  export const ThemeProvider: React.FC<ThemeProviderProps>;
  export const useTheme: () => UseThemeReturn;
}
