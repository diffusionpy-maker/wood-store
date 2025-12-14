"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ShoppingCart, User, ChevronDown, LogOut, Menu, X, Search, Bell, Heart } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import LogoutDialog from "@/components/frontend/LogoutDialog";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user || { name: "未登入", email: "", image: undefined };
  const cartCount = useCartStore((state) => state.cart.length);
  const [showLogout, setShowLogout] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => setOpen(!open);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 border-b ${scrolled
            ? "bg-white/90 backdrop-blur-md border-gray-200/50 shadow-sm py-2"
            : "bg-white/50 backdrop-blur-sm border-transparent py-4"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-2" aria-label="回首頁">
              <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl text-white font-bold text-xl shadow-lg group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all duration-300">
                木
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 tracking-wide group-hover:text-emerald-700 transition-colors duration-300">
                  木栖所
                </span>
                <span className="text-[10px] font-medium text-gray-400 tracking-[0.2em] uppercase group-hover:text-emerald-500/70 transition-colors duration-300">
                  MuQi Select
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm">
            {[
              { href: "/products", label: "精選商品" },
              { href: "/ai-select", label: "AI選物" },
              { href: "/about", label: "品牌故事" },
              { href: "/faq", label: "常見問題" },
              { href: "/contact", label: "聯絡客服" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-emerald-700 transition-all duration-300 hover:bg-white hover:shadow-sm group"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Button (Desktop) */}
            <button className="hidden md:flex p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors hover:text-emerald-600">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all duration-300 hover:text-emerald-600 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-white transform scale-100 group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                className={`
                  flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all duration-300
                  ${open
                    ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-100'
                    : 'bg-white border-gray-200 hover:border-emerald-200 hover:shadow-md'
                  }
                `}
                onClick={toggleDropdown}
              >
                <div className="relative">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${session ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180 text-emerald-500' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
                  <div className="absolute right-0 mt-3 w-80 origin-top-right z-40 animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                      {/* User Header */}
                      <div className="p-6 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-white flex flex-col items-center border-b border-gray-100">
                        <div className="relative mb-3">
                          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 blur-sm"></div>
                          {user.image ? (
                            <img src={user.image} alt="avatar" className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm" />
                          ) : (
                            <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-sm text-gray-400">
                              <User className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">{user.name !== "未登入" ? user.name : "訪客"}</h3>
                        <p className="text-xs text-gray-500 mt-1">{user.email || "歡迎來到木栖所"}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2 space-y-1">
                        {session ? (
                          <>
                            <MenuLink href="/member" icon={<User className="w-4 h-4" />} label="會員中心" />
                            <MenuLink href="/orders" icon={<ShoppingCart className="w-4 h-4" />} label="訂單紀錄" />
                            <MenuLink href="/favorites" icon={<Heart className="w-4 h-4" />} label="我的收藏" />
                            <MenuLink href="/notifications" icon={<Bell className="w-4 h-4" />} label="通知中心" />

                            <div className="my-2 border-t border-gray-100 mx-2"></div>

                            <button
                              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors group text-left text-sm font-medium"
                              onClick={() => setShowLogout(true)}
                            >
                              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              登出帳號
                            </button>
                          </>
                        ) : (
                          <MenuLink href="/login" icon={<User className="w-4 h-4" />} label="登入" />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl absolute w-full left-0 top-full shadow-lg animate-in slide-in-from-top-5 duration-300">
            <div className="p-4 space-y-2">
              {[
                { href: "/products", label: "精選商品" },
                { href: "/ai-select", label: "AI選物" },
                { href: "/about", label: "品牌故事" },
                { href: "/faq", label: "常見問題" },
                { href: "/contact", label: "聯絡客服" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>

{showLogout && (
  <LogoutDialog onClose={() => setShowLogout(false)} />
)}
    </>
  );
}

function MenuLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition-all duration-200 group"
    >
      <div className="text-gray-400 group-hover:text-emerald-500 transition-colors">
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
      <ChevronDown className="w-3 h-3 ml-auto text-gray-300 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
    </Link>
  );
}
