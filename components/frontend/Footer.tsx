"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight, Send, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Footer() {
  return (
    <footer className="w-full bg-background pt-20 pb-10 relative">
      {/* Ambient Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-muted/20 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section - Integrated Glass Card */}
        <div className="relative mb-20 max-w-4xl mx-auto px-4">
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-primary/5 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 hover:bg-card/60 transition-all duration-500">
            {/* Dynamic Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 p-10 opacity-[0.05] scale-125 rotate-12 transition-all duration-700 group-hover:rotate-0 group-hover:scale-110 pointer-events-none">
              <Send className="w-32 h-32 text-primary" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="text-center md:text-left flex-1 min-w-0 md:pl-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  NEWSLETTER
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-foreground mb-3 tracking-tight group-hover:text-primary/80 transition-colors duration-300">
                  Subscribe for <span className="font-serif italic text-primary">Inspiration</span>
                </h3>
                <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed max-w-sm mx-auto md:mx-0 group-hover:text-foreground/80 transition-colors">
                  每週接收北歐居家美學提案與獨家優惠，<br className="hidden md:block" />讓生活多一點質感。
                </p>
              </div>

              <div className="w-full md:w-auto max-w-md flex-shrink-0">
                <form className="flex flex-col sm:flex-row gap-3 relative" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative w-full">
                    <Input
                      type="email"
                      placeholder="輸入您的 Email"
                      className="rounded-full h-12 pl-6 pr-4 bg-white/60 border-primary/10 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all w-full text-base font-light placeholder:text-muted-foreground/60 shadow-sm"
                    />
                  </div>
                  <Button size="lg" className="rounded-full h-12 px-8 shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] gap-2 font-normal whitespace-nowrap text-sm transition-all duration-300 bg-primary text-primary-foreground border border-primary hover:bg-transparent hover:text-primary">
                    訂閱
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3 text-center md:text-left font-light opacity-70 tracking-wide pl-2">
                  首次訂閱即享 9 折優惠碼。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-16 border-t border-border/20 pt-16">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors duration-500">
                  <img src="/images/20251226_logo_std_000.svg" alt="MuQi Logo" className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-normal text-foreground tracking-wide group-hover:text-primary transition-colors">木栖所</span>
                  <span className="text-[10px] font-medium text-muted-foreground tracking-[0.3em] uppercase opacity-70">MuQi Select</span>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground font-light text-sm leading-loose text-justify opacity-90 max-w-xs">
              源自對自然的嚮往，為您挑選最優質的木製家居。<br />讓每一次觸摸，都感受到樹木的溫度。
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} href="#" label="Facebook" />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} href="#" label="Instagram" />
              <SocialIcon icon={<MessageCircle className="w-4 h-4" />} href="#" label="Line" />
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase opacity-60">探索選物</h4>
              <ul className="space-y-3.5">
                <FooterLink href="/products" label="全系列商品" />
                <FooterLink href="/products?category=new" label="本季新品" />
                <FooterLink href="/ai-select" label="AI 智能選品" badge="New" />
                <FooterLink href="/products?category=sale" label="優惠專區" />
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase opacity-60">關於品牌</h4>
              <ul className="space-y-3.5">
                <FooterLink href="/about" label="品牌故事" />
                <FooterLink href="/blog" label="設計專欄" />
                <FooterLink href="/stores" label="門市資訊" />
                <FooterLink href="/careers" label="人才招募" />
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-xs font-semibold text-foreground tracking-widest uppercase opacity-60">客戶服務</h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 text-primary/60 mt-0.5 group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground font-light group-hover:text-foreground transition-colors leading-relaxed">
                    台北市信義區<br />信義路五段7號 (台北101)
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground font-light group-hover:text-foreground transition-colors">(02) 2345-6789</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground font-light group-hover:text-foreground transition-colors">service@muqiselect.com</span>
                </li>
                <li className="pt-4 border-t border-border/40 mt-2">
                  <div className="text-xs text-muted-foreground tracking-wider mb-1 opacity-70">服務時間</div>
                  <div className="text-sm text-foreground font-medium">Mon - Fri / 09:00 - 18:00</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
            <p className="text-muted-foreground text-xs font-light tracking-wide opacity-80">
              © 2025 木栖所 MuQi Select. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <Globe className="w-3 h-3" />
              <span>Taiwan (繁體中文)</span>
            </div>
          </div>

          <div className="flex gap-8 text-xs text-muted-foreground font-light tracking-wide opacity-90">
            <Link href="/terms" className="hover:text-primary transition-colors relative group">
              使用條款
              <span className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors relative group">
              隱私政策
              <span className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors relative group">
              網站地圖
              <span className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full bg-background border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 hover:scale-110 transition-all duration-300 shadow-sm"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, label, badge }: { href: string; label: string, badge?: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground text-sm font-light hover:text-primary transition-colors flex items-center gap-3 group w-fit"
      >
        <span className="w-1 h-1 rounded-full bg-primary/40 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
        {badge && (
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{badge}</span>
        )}
      </Link>
    </li>
  );
}
