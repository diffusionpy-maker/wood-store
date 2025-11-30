"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">訂閱我們的電子報</h3>
              <p className="text-gray-600">獲取最新的產品資訊、獨家優惠和設計靈感。首次訂閱可享 9 折優惠！</p>
            </div>
            <div className="w-full md:w-auto flex-shrink-0">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="輸入您的 Email"
                  className="px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all w-full sm:w-80"
                />
                <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group">
                  訂閱
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 flex items-center justify-center bg-emerald-600 rounded-xl text-white font-bold text-xl shadow-lg">
                木
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 tracking-wide">木栖所</span>
                <span className="text-[10px] font-medium text-gray-400 tracking-[0.2em] uppercase">MuQi Select</span>
              </div>
            </Link>
            <p className="text-gray-500 leading-relaxed">
              致力於為您挑選最優質的木製家居用品，讓自然溫暖您的生活空間。每一件商品都經過精心挑選，只為給您最好的生活體驗。
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 text-lg mb-6">快速連結</h4>
            <ul className="space-y-4">
              <FooterLink href="/products" label="精選商品" />
              <FooterLink href="/ai-select" label="AI 智能選物" />
              <FooterLink href="/about" label="關於我們" />
              <FooterLink href="/blog" label="設計專欄" />
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-gray-800 text-lg mb-6">客戶服務</h4>
            <ul className="space-y-4">
              <FooterLink href="/faq" label="常見問題" />
              <FooterLink href="/shipping" label="運送政策" />
              <FooterLink href="/returns" label="退換貨說明" />
              <FooterLink href="/privacy" label="隱私權政策" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-800 text-lg mb-6">聯絡我們</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>台北市信義區信義路五段7號 (台北101)</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>(02) 2345-6789</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>service@muqiselect.com</span>
              </li>
              <li className="pt-4">
                <div className="text-sm text-gray-400 mb-2">服務時間</div>
                <div className="text-gray-600 font-medium">週一至週五 09:00 - 18:00</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 木栖所 MuQi Select. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">使用條款</Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">隱私政策</Link>
            <Link href="/sitemap" className="hover:text-emerald-600 transition-colors">網站地圖</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-110 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-2 group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
      </Link>
    </li>
  );
}
