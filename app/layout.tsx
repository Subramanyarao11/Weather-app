import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthContextProvider from '@/lib/store/auth-context';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/Navbar';

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
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthContextProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-grow">{children}</div>
            </div>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
