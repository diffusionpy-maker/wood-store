"use client";
import { useState } from "react";
import { Check, CreditCard, ShoppingBag, ArrowRight, ChevronRight } from "lucide-react";

const products = [
  { id: "wood01", name: "木栖所體驗組", price: 1280, desc: "入門首選" },
  { id: "wood02", name: "木栖所經典組", price: 1980, desc: "熱銷推薦" },
  { id: "wood03", name: "木栖所尊爵組", price: 3280, desc: "限量收藏" },
];

export default function OrderPage() {
  const [selected, setSelected] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">訂購流程</h1>
          <p className="text-gray-500">簡單三步驟，輕鬆完成訂購</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <Step number={1} title="選擇商品" active={!selected} completed={!!selected} />
          <StepConnector active={!!selected} />
          <Step number={2} title="確認訂單" active={!!selected && !!product} completed={false} />
          <StepConnector active={false} />
          <Step number={3} title="綠界付款" active={false} completed={false} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500">
          {!selected ? (
            <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                請選擇您要的商品
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {products.map((p) => (
                  <button
                    key={p.id}
                    className="group w-full p-5 border border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/30 hover:shadow-md text-left transition-all duration-200 flex items-center justify-between"
                    onClick={() => setSelected(p.id)}
                  >
                    <div>
                      <div className="font-bold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">{p.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{p.desc}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-emerald-600 font-bold text-lg">NT$ {p.price.toLocaleString()}</div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  確認您的訂單
                </h2>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">商品名稱</span>
                    <span className="font-bold text-gray-800 text-lg">{product?.name}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-gray-500">應付金額</span>
                    <span className="text-2xl font-bold text-emerald-600">NT$ {product?.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleEcpay}>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <CreditCard className="w-5 h-5" />
                  前往綠界付款
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <button
                className="mt-4 w-full py-3 rounded-xl text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700 transition-colors"
                onClick={() => setSelected(null)}
              >
                返回重新選擇
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 bg-gray-100 inline-block px-4 py-2 rounded-full">
            本頁僅為金流串接模擬，請勿輸入真實信用卡資料
          </p>
        </div>
      </div>
    </div>
  );
}

function Step({ number, title, active, completed }: { number: number; title: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 
          ${completed
            ? 'bg-emerald-600 border-emerald-600 text-white'
            : active
              ? 'bg-white border-emerald-600 text-emerald-600 shadow-[0_0_0_4px_rgba(5,150,105,0.1)]'
              : 'bg-white border-gray-200 text-gray-400'
          }`}
      >
        {completed ? <Check className="w-5 h-5" /> : number}
      </div>
      <span
        className={`mt-2 text-xs font-medium transition-colors duration-300 
          ${active || completed ? 'text-emerald-700' : 'text-gray-400'}`}
      >
        {title}
      </span>
    </div>
  );
}

function StepConnector({ active }: { active: boolean }) {
  return (
    <div className={`w-16 h-0.5 mx-2 -mt-6 transition-colors duration-500 ${active ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
  );
}
