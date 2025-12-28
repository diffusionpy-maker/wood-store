import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="max-w-md w-full bg-card/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-primary/5 p-10 text-center border border-border/50 animate-in zoom-in-95 fade-in duration-500 relative z-10">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20 duration-1000"></div>
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
          <CheckCircle className="w-10 h-10 text-primary relative z-10" strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-light text-foreground mb-4 tracking-tight">付款成功！</h1>
        <p className="text-muted-foreground mb-10 leading-relaxed font-light text-lg">
          感謝您的訂購，我們已收到您的款項。
          <br />
          商品將盡快為您寄出，請留意出貨通知。
        </p>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full h-14 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] text-lg font-normal">
            <Link href="/" className="gap-2">
              <Home className="w-5 h-5" />
              返回首頁
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full h-14 rounded-2xl border-border/50 hover:bg-muted/50 text-lg font-normal">
            <Link href="/products" className="gap-2">
              <ShoppingBag className="w-5 h-5" />
              繼續購物
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
