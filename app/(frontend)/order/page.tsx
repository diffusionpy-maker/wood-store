"use client";
import { useState } from "react";
import { Check, CreditCard, ShoppingBag, ArrowRight, ChevronRight, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: "wood01", name: "木栖所體驗組", price: 1280, desc: "適合初次接觸木作的您，包含基礎餐具與保養油。" },
  { id: "wood02", name: "木栖所經典組", price: 1980, desc: "精選胡桃木製作，包含托盤、杯墊與攪拌匙。" },
  { id: "wood03", name: "木栖所尊爵組", price: 3280, desc: "大師級手工雕刻，限量發售，極具收藏價值。" },
];

export default function OrderPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedPay, setSelectedPay] = useState<'ecpay' | 'linepay'>('ecpay');
  const product = products.find((p) => p.id === selected);

  // 綠界付款流程
  const handleEcpay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const res = await fetch("/api/ecpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: product.id, amount: product.price }),
    });
    const html = await res.text();
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  // LinePay 付款流程
  const handleLinePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    const res = await fetch("/api/linepay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: product.id, amount: product.price, productName: product.name }),
    });
    const data = await res.json();
    if (data.paymentUrl) {
      window.open(data.paymentUrl, "_blank");
    } else {
      alert("LinePay 付款失敗：" + (data.error || "未知錯誤"));
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-muted/20 rounded-full blur-[100px] -z-10 animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-4 py-20 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-foreground mb-4 tracking-tight">訂購流程</h1>
          <p className="text-muted-foreground font-light">
            簡單三步驟，為生活注入自然溫度
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-16 relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border -z-10 w-3/4 mx-auto"></div>

          <div className="flex justify-between w-full max-w-lg">
            <Step number={1} title="選擇商品" active={!selected} completed={!!selected} icon={<ShoppingBag className="w-5 h-5" />} />
            <Step number={2} title="確認訂單" active={!!selected && !!product} completed={!!selected && !!product && false} icon={<Check className="w-5 h-5" />} />
            <Step number={3} title="進行付款" active={false} completed={false} icon={<CreditCard className="w-5 h-5" />} />
          </div>
        </div>

        <div className="relative">
          {!selected ? (
            <div className="bg-card/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h2 className="text-2xl font-light text-foreground mb-8 text-center">
                請選擇您心儀的商品
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {products.map((p) => (
                  <button
                    key={p.id}
                    className="group w-full p-6 bg-background/50 hover:bg-white rounded-3xl border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 text-left transition-all duration-300 flex items-center justify-between"
                    onClick={() => setSelected(p.id)}
                  >
                    <div className="space-y-2">
                      <div className="font-medium text-foreground text-xl group-hover:text-primary transition-colors">{p.name}</div>
                      <div className="text-sm text-muted-foreground font-light">{p.desc}</div>
                    </div>
                    <div className="flex items-center gap-6 pl-4">
                      <div className="text-foreground/80 font-medium text-lg">NT$ {p.price.toLocaleString()}</div>
                      <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 animate-in fade-in slide-in-from-right-8 duration-500">
              <button
                className="mb-8 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group px-4 py-2 rounded-full hover:bg-muted/50 w-fit"
                onClick={() => setSelected(null)}
              >
                <ChevronRight className="w-4 h-4 rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
                重新選擇商品
              </button>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-light text-foreground mb-6">訂單明細</h2>
                    <div className="p-8 bg-white/60 rounded-[2rem] border border-border/50 shadow-sm space-y-4">
                      <div className="flex justify-between items-start pb-4 border-b border-border/50">
                        <div>
                          <span className="block text-sm text-muted-foreground mb-1">商品名稱</span>
                          <span className="font-medium text-foreground text-lg">{product?.name}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline pt-2">
                        <span className="text-sm text-muted-foreground">應付金額</span>
                        <span className="text-3xl font-light text-primary">NT$ {product?.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10 flex gap-4 items-start">
                    <div className="p-2 bg-background rounded-full text-primary shadow-sm mt-1">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">安心配送</h4>
                      <p className="text-sm text-muted-foreground font-light">所有商品皆採用防撞包裝，確保安全送達您的手中。</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-2xl font-light text-foreground mb-6">選擇付款方式</h2>

                  <div className="grid grid-cols-1 gap-4">
                    <button
                      type="button"
                      className={`w-full p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between group
                          ${selectedPay === 'ecpay'
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                          : 'bg-background hover:bg-white border-border/50 text-foreground hover:shadow-md'}`}
                      onClick={() => setSelectedPay('ecpay')}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${selectedPay === 'ecpay' ? 'bg-white/20' : 'bg-muted/50'}`}>
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-lg">綠界科技 ECPay</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPay === 'ecpay' ? 'border-white bg-white text-primary' : 'border-muted-foreground/30'}`}>
                        {selectedPay === 'ecpay' && <Check className="w-4 h-4" strokeWidth={3} />}
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`w-full p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between group
                          ${selectedPay === 'linepay'
                          ? 'bg-[#00C300] text-white border-[#00C300] shadow-lg shadow-[#00C300]/20'
                          : 'bg-background hover:bg-white border-border/50 text-foreground hover:shadow-md'}`}
                      onClick={() => setSelectedPay('linepay')}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${selectedPay === 'linepay' ? 'bg-white/20' : 'bg-muted/50'}`}>
                          <Wallet className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-lg">LinePay</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPay === 'linepay' ? 'border-white bg-white text-[#00C300]' : 'border-muted-foreground/30'}`}>
                        {selectedPay === 'linepay' && <Check className="w-4 h-4" strokeWidth={3} />}
                      </div>
                    </button>
                  </div>

                  <div className="pt-6">
                    {selectedPay === 'ecpay' && (
                      <form className="space-y-4" onSubmit={handleEcpay}>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-14 rounded-full text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] gap-2"
                        >
                          <CreditCard className="w-5 h-5" />
                          確認付款
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </form>
                    )}
                    {selectedPay === 'linepay' && (
                      <form className="space-y-4" onSubmit={handleLinePay}>
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-14 rounded-full text-lg shadow-lg shadow-[#00C300]/20 hover:scale-[1.02] gap-2 bg-[#00C300] hover:bg-[#00B300] text-white border-transparent"
                        >
                          <Wallet className="w-5 h-5" />
                          LinePay 付款
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Step({ number, title, active, completed, icon }: { number: number; title: string; active: boolean; completed: boolean; icon: React.ReactNode }) {
  return (
    <div className={`flex flex-col items-center relative z-10 gap-3 transition-opacity duration-300 ${active || completed ? 'opacity-100' : 'opacity-60'}`}>
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-sm
          ${completed
            ? 'bg-primary text-primary-foreground scale-100'
            : active
              ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20 ring-4 ring-primary/10'
              : 'bg-card text-muted-foreground border border-border'
          }`}
      >
        {completed ? <Check className="w-6 h-6" /> : icon}
      </div>
      <span
        className={`text-sm font-medium transition-colors duration-300 tracking-wide
          ${active || completed ? 'text-primary' : 'text-muted-foreground'}`}
      >
        {title}
      </span>
    </div>
  );
}
