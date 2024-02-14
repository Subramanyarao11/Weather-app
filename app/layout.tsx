import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthContextProvider from '@/lib/store/auth-context';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weather App | Subramanya Rao',
  description: 'A simple weather app built with Next.js and Tailwind CSS by Subramanya Rao.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* flex flex-col */}
      <body
        className={`${inter.className} container mx-auto flex min-h-screen flex-col px-[1rem] antialiased selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black md:px-[2rem]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthContextProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-grow">{children}</div>
            </div>
          </AuthContextProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
