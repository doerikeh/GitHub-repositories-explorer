import type { Metadata } from 'next';
import './globals.css';
import { GithubProvider } from '@/context/GithubContext';

export const metadata: Metadata = {
  title: 'GitHub Repositories Explorer',
  description: 'Search GitHub users and explore their repositories',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen font-sans">
        <GithubProvider>{children}</GithubProvider>
      </body>
    </html>
  );
}