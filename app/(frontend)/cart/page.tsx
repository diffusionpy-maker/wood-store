"use client";
import { useCartStore } from "@/lib/cartStore";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

      <div className="container mx-auto px-4 py-24 lg:py-32 max-w-6xl relative z-10">
        <div className="flex items-center gap-2 mb-12 text-muted-foreground hover:text-primary transition-colors w-fit group cursor-pointer">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <Link href="/products" className="font-light">繼續購物</Link>
        </div>

        <div className="flex items-end justify-between mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">
            購物車
            <span className="block text-lg text-muted-foreground mt-2 font-normal">您的專屬選物清單</span>
          </h1>
          <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full animate-in fade-in slide-in-from-right-4">
            {cart.length} 件商品
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <ShoppingBag className="w-12 h-12 text-muted-foreground relative z-10" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-medium text-foreground mb-4">購物車目前沒有商品</h2>
            <p className="text-muted-foreground mb-10 font-light max-w-md mx-auto">
              去逛逛精選商品，尋找您的心頭好，讓生活多一點溫度吧！
            </p>
            <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] gap-2">
              <Link href="/products">
                前往選購
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((p, idx) => (
                <div
                  key={p.id + '-' + idx}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-[2rem] border border-border/50 flex flex-col sm:flex-row items-center gap-6 group hover:bg-white hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-32 h-32 bg-muted/20 rounded-2xl flex-shrink-0 flex items-center justify-center text-muted-foreground/30 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <Package className="w-8 h-8 opacity-50" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h3 className="font-medium text-foreground text-xl tracking-tight">{p.name}</h3>
                    <p className="text-sm text-muted-foreground font-light">規格：標準版</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
                    <div className="font-medium text-foreground text-xl">
                      NT$ {p.price.toLocaleString()}
                    </div>
                    <button
                      className="p-3 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/5 rounded-full transition-all group-hover:text-muted-foreground"
                      onClick={() => removeFromCart(p.id)}
                      aria-label="移除商品"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-[24rem]">
              <div className="bg-card/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border/50 sticky top-32">
                <h2 className="text-xl font-medium text-foreground mb-8">訂單摘要</h2>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between text-muted-foreground font-light text-lg">
                    <span>小計</span>
                    <span>NT$ {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-light text-lg">
                    <span>運費</span>
                    <span className="text-primary font-medium">免運費</span>
                  </div>
                  <div className="pt-6 border-t border-border/50 flex justify-between items-baseline">
                    <span className="font-medium text-foreground text-lg">總金額</span>
                    <span className="text-3xl font-light text-foreground tracking-tight">
                      NT$ {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full h-16 text-lg rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] hover:shadow-primary/30 transition-all font-normal">
                  <Link href="/order" className="flex items-center justify-center gap-2">
                    前往結帳
                    <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                  </Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-6 font-light opacity-60">
                  結帳即表示您同意我們的服務條款與隱私政策
                  <br />
                  Secure Checkout by MuQi
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
