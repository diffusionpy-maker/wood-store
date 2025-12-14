import type { Metadata } from 'next';
import 'antd/dist/reset.css';
import './globals.css';
import { AntdConfigProvider } from '@/components/providers/AntdConfigProvider';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';

export const metadata: Metadata = {
  title: 'Wood Store Auction System',
  description: 'Auction & store platform for managing products, orders, payments, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body suppressHydrationWarning>
        <SessionProviderWrapper>
          <AntdConfigProvider>{children}</AntdConfigProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
