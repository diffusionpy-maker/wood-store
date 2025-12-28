import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import 'antd/dist/reset.css';
import './globals.css';
import { AntdConfigProvider } from '@/components/providers/AntdConfigProvider';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wood Store Auction System',
  description: 'Auction & store platform for managing products, orders, payments, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${ubuntu.variable} font-sans antialiased`} suppressHydrationWarning>
        <SessionProviderWrapper>
          <AntdConfigProvider>{children}</AntdConfigProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
