import React from "react";
import { CreditCard, ShieldCheck, ArrowRight, Wallet } from "lucide-react";

// 綠界金流模擬元件（前端展示用）
export default function ECPayMockOrder() {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-30 transform -skew-y-12 scale-150"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">安全結帳</h2>
            <p className="text-emerald-50 text-sm flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              綠界金流 SSL 加密傳輸
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Credit Card Visual */}
          <div className="mb-8 relative group perspective-1000">
            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <Wallet className="w-24 h-24" />
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-8 bg-yellow-500/80 rounded-md flex items-center justify-center">
                    <div className="w-8 h-5 border border-yellow-600/50 rounded-sm"></div>
                  </div>
                  <span className="font-mono text-xl tracking-widest">**** **** **** 1234</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Card Holder</div>
                  <div className="font-medium tracking-wide">MUQI MEMBER</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500 text-sm">訂單編號</span>
              <span className="font-mono font-medium text-gray-800">#20251122</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-500 text-sm">商品名稱</span>
              <span className="font-medium text-gray-800">木栖所體驗組</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-emerald-700 font-medium">應付金額</span>
              <span className="text-2xl font-bold text-emerald-700">NT$ 1,280</span>
            </div>
          </div>

          {/* Action */}
          <form action="/api/ecpay-mock" method="POST" className="space-y-4">
            <input type="hidden" name="orderId" value="20251122" />
            <input type="hidden" name="amount" value="1280" />
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg shadow-lg shadow-emerald-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              前往綠界付款
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              本頁僅為金流串接模擬，請勿輸入真實信用卡資料。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
