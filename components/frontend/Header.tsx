"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ShoppingCart, User, ChevronDown, LogOut, Menu, X, Search, Bell, Heart } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import LogoutDialog from "@/components/frontend/LogoutDialog";
import { cn } from "@/lib/utils";

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
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-white/20 py-3 shadow-sm shadow-black/5"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3" aria-label="回首頁">
            <div className="relative w-9 h-9 md:w-10 md:h-10 transition-transform duration-500 ease-out group-hover:rotate-12">
              <img src="/images/20251226_logo_std_000.svg" alt="MuQi Logo" className="w-full h-full object-contain opacity-90 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-normal text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">
                木栖所
              </span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-[0.3em] uppercase opacity-70 group-hover:text-primary/70 transition-colors duration-300">
                MuQi Select
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Minimalist & Centered */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
            {[
              { href: "/products", label: "Collections" },
              { href: "/ai-select", label: "AI Select" },
              { href: "/about", label: "Story" },
              { href: "/faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-base font-light text-muted-foreground hover:text-foreground transition-colors duration-300 group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-primary -translate-x-1/2 transition-all duration-300 group-hover:w-full opacity-50"></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions - Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Search (Desktop) */}
            <button className="hidden md:flex p-2.5 text-muted-foreground/80 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2.5 text-muted-foreground/80 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm ring-2 ring-background transform scale-100 group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu - Glass Pill */}
            <div className="relative ml-1">
              <button
                className={cn(
                  "flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-full border transition-all duration-300 group",
                  open
                    ? "bg-white border-primary/20 ring-2 ring-primary/5 shadow-md"
                    : "bg-transparent border-transparent hover:bg-white/50 hover:border-border/40"
                )}
                onClick={toggleDropdown}
              >
                <div className="relative">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border border-white/50 shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 border border-transparent group-hover:border-primary/20 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  {session && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background bg-green-500"></span>
                  )}
                </div>
                <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-300", open && "rotate-180 text-primary")} />
              </button>

              {/* Dropdown Menu */}
              {open && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
                  <div className="absolute right-0 mt-4 w-72 origin-top-right z-40 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-primary/10 border border-white/40 overflow-hidden ring-1 ring-black/5 p-2">
                      {/* User Header */}
                      <div className="p-4 bg-primary/5 rounded-2xl flex items-center gap-4 mb-2">
                        <div className="relative">
                          {user.image ? (
                            <img src={user.image} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary/40 shadow-sm">
                              <User className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-sm truncate">{user.name !== "未登入" ? user.name : "Guest"}</h3>
                          <p className="text-xs text-muted-foreground truncate opacity-70">{user.email || "Welcome to MuQi"}</p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-0.5">
                        {session ? (
                          <>
                            <MenuLink href="/member" icon={<User className="w-4 h-4" />} label="Account" />
                            <MenuLink href="/orders" icon={<ShoppingCart className="w-4 h-4" />} label="Orders" />
                            <MenuLink href="/favorites" icon={<Heart className="w-4 h-4" />} label="Wishlist" />
                            <div className="my-2 h-px bg-border/30 mx-3"></div>
                            <button
                              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-colors group text-left text-sm font-medium"
                              onClick={() => setShowLogout(true)}
                            >
                              <div className="w-8 h-8 rounded-full bg-transparent group-hover:bg-destructive/10 flex items-center justify-center transition-colors">
                                <LogOut className="w-4 h-4" />
                              </div>
                              Sign Out
                            </button>
                          </>
                        ) : (
                          <MenuLink href="/login" icon={<User className="w-4 h-4" />} label="Login / Register" />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl animate-in fade-in duration-200 top-[72px]">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="p-6 space-y-2 pt-10">
              {[
                { href: "/products", label: "Collections" },
                { href: "/ai-select", label: "AI Select" },
                { href: "/about", label: "Our Story" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-2xl font-light text-foreground p-4 hover:pl-6 transition-all border-b border-border/30 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    <span className="text-xl opacity-20">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-0 md:h-0"></div>
      {/* Set height to 0 because we want content to go under the transparent header initially, usually. 
          If content is overlapped, the page should handle pt-24. 
          Checking other pages: ProductsPage has pt-24. Homepage has ScrollReveal. 
          Let's keep h-0 so hero sections go to top. 
      */}

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
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
    >
      <div className="w-8 h-8 rounded-full bg-transparent group-hover:bg-primary/10 flex items-center justify-center transition-colors text-muted-foreground/70 group-hover:text-primary">
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
      <ChevronDown className="w-3 h-3 ml-auto text-muted-foreground/30 -rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
    </Link>
  );
}
