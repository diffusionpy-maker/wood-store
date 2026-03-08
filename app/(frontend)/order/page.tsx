"use client";
import { useState } from "react";
import { Check, CreditCard, ShoppingBag, ArrowRight, ChevronRight, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const products = [
  { id: "wood01", name: "木栖所體驗組", price: 1280, desc: "適合初次接觸木作的您，包含基礎餐具與保養油。" },
  { id: "wood02", name: "木栖所經典組", price: 1980, desc: "精選胡桃木製作，包含托盤、杯墊與攪拌匙。" },
  { id: "wood03", name: "木栖所尊爵組", price: 3280, desc: "大師級手工雕刻，限量發售，極具收藏價值。" },
];

export default function OrderPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [step, setStep] = useState(1); // 1: Select, 2: Confirm, 3: Payment
  const [selectedPay, setSelectedPay] = useState<'ecpay' | 'linepay'>('ecpay');

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));
  const totalAmount = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // 綠界付款流程
  const handleEcpay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProducts.length === 0) return;

    const res = await fetch("/api/ecpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: "COMBINED-" + Date.now(),
        amount: totalAmount,
        itemNames: selectedProducts.map(p => p.name)
      }),
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
    if (selectedProducts.length === 0) return;
    const res = await fetch("/api/linepay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: "COMBINED-" + Date.now(),
        amount: totalAmount,
        productName: selectedProducts.map(p => p.name).join(", ")
      }),
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
        <div className="text-center mb-12 pt-10">
          <h1 className="text-4xl font-light text-foreground mb-4 tracking-tight">訂購流程</h1>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="max-w-2xl mx-auto mb-20 relative">
          {/* Line Background */}
          <div className="absolute top-4 left-0 w-full h-[1px] bg-border -z-10"></div>
          {/* Active Line - Animated width */}
          <div
            className="absolute top-4 left-0 h-[1px] bg-primary -z-10 transition-all duration-700 ease-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>

          <div className="flex justify-between w-full">
            {/* Step 1 */}
            <div className={`flex flex-col items-center gap-3 transition-colors duration-500 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center bg-background transition-all duration-500 z-10
                    ${step >= 1 ? 'border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] scale-110' : 'border-border'}`}>
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-xs md:text-sm font-medium tracking-widest uppercase mt-2">選擇商品</span>
            </div>

            {/* Step 2 */}
            <div className={`flex flex-col items-center gap-3 transition-colors duration-500 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center bg-background transition-all duration-500 z-10
                    ${step >= 2 ? 'border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] scale-110' : 'border-border'}`}>
                <Check className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-xs md:text-sm font-medium tracking-widest uppercase mt-2">確認訂單</span>
            </div>

            {/* Step 3 */}
            <div className={`flex flex-col items-center gap-3 transition-colors duration-500 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center bg-background transition-all duration-500 z-10
                    ${step >= 3 ? 'border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] scale-110' : 'border-border'}`}>
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-xs md:text-sm font-medium tracking-widest uppercase mt-2">進行付款</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[500px]">
          {/* Step 1: Select Products */}
          {step === 1 && (
            <div className="bg-card/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h2 className="text-2xl font-light text-foreground mb-8 text-center tracking-wide">
                請選擇您要購入的商品 <span className="text-sm text-muted-foreground font-normal ml-2">(可多選)</span>
              </h2>
              <div className="grid grid-cols-1 gap-6 mb-8">
                {products.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      className={`group w-full p-6 rounded-3xl border text-left transition-all duration-300 flex items-center justify-between
                        ${isSelected
                          ? 'bg-primary/5 border-primary/50 shadow-md shadow-primary/10'
                          : 'bg-background/50 hover:bg-white border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5'
                        }`}
                      onClick={() => toggleSelection(p.id)}
                    >
                      <div className="space-y-2">
                        <div className={`font-medium text-xl transition-colors ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{p.name}</div>
                        <div className="text-sm text-muted-foreground font-light">{p.desc}</div>
                      </div>
                      <div className="flex items-center gap-6 pl-4">
                        <div className="text-foreground/80 font-medium text-lg">NT$ {p.price.toLocaleString()}</div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                          ${isSelected
                            ? 'bg-primary border-primary text-white'
                            : 'border-muted-foreground/30 text-transparent group-hover:border-primary/50'
                          }`}>
                          <Check className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-8 border-t border-border/50">
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">已選擇 {selectedIds.length} 項商品</p>
                    <p className="text-2xl font-medium text-primary">NT$ {totalAmount.toLocaleString()}</p>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/20 group"
                    disabled={selectedIds.length === 0}
                    onClick={nextStep}
                  >
                    選擇完成 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Confirm Order */}
          {step === 2 && (
            <div className="bg-card/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 animate-in fade-in slide-in-from-right-8 duration-500">
              <button
                className="mb-8 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group px-4 py-2 rounded-full hover:bg-muted/50 w-fit"
                onClick={prevStep}
              >
                <ChevronRight className="w-4 h-4 rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
                返回修改商品
              </button>

              <h2 className="text-2xl font-light text-foreground mb-8 text-center">訂單確認</h2>

              <div className="bg-white/60 rounded-[2rem] border border-border/50 shadow-sm overflow-hidden mb-8">
                {selectedProducts.map((p, idx) => (
                  <div key={p.id} className={`flex justify-between items-center p-6 ${idx !== selectedProducts.length - 1 ? 'border-b border-border/50' : ''}`}>
                    <div>
                      <div className="text-foreground font-medium text-lg">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.desc}</div>
                    </div>
                    <div className="text-foreground font-medium">NT$ {p.price.toLocaleString()}</div>
                  </div>
                ))}
                <div className="bg-primary/5 p-6 flex justify-between items-center border-t border-primary/10">
                  <span className="text-muted-foreground">總金額</span>
                  <span className="text-3xl text-primary font-light">NT$ {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-muted/30 rounded-[2rem] p-6 mb-8 flex gap-4 items-start border border-border/50">
                <div className="p-2 bg-background rounded-full text-primary shadow-sm mt-1">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">安心配送</h4>
                  <p className="text-sm text-muted-foreground font-light">所有商品皆採用防撞包裝，確保安全送達您的手中。</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="rounded-full px-12 h-14 text-lg shadow-lg shadow-primary/20 group w-full md:w-auto"
                  onClick={nextStep}
                >
                  前往付款 <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-card/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border/50 animate-in fade-in slide-in-from-right-8 duration-500">
              <button
                className="mb-8 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group px-4 py-2 rounded-full hover:bg-muted/50 w-fit"
                onClick={prevStep}
              >
                <ChevronRight className="w-4 h-4 rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
                返回確認訂單
              </button>

              <div className="max-w-xl mx-auto space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-foreground mb-2">選擇付款方式</h2>
                  <p className="text-muted-foreground">總金額: <span className="text-primary font-medium">NT$ {totalAmount.toLocaleString()}</span></p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    className={`w-full p-6 rounded-[2rem] border transition-all duration-300 flex items-center justify-between group
                          ${selectedPay === 'ecpay'
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]'
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
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                        : 'bg-background hover:bg-white border-border/50 text-foreground hover:shadow-md'}`}
                    onClick={() => setSelectedPay('linepay')}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${selectedPay === 'linepay' ? 'bg-white/20' : 'bg-muted/50'}`}>
                        <Wallet className="w-6 h-6" />
                      </div>
                      <span className="font-medium text-lg">LinePay</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPay === 'linepay' ? 'border-white bg-white text-primary' : 'border-muted-foreground/30'}`}>
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
                        className="w-full h-14 rounded-full text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] gap-2"
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
          )}
        </div>
      </div>
    </div>
  );
}


