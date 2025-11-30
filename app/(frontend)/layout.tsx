'use client';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import { usePathname } from 'next/navigation';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/admin-login') {
    return <>{children}</>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
