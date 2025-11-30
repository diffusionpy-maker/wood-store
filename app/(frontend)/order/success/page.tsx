import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
          <CheckCircle className="w-10 h-10 text-emerald-600 relative z-10" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">付款成功！</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          感謝您的訂購，我們已收到您的款項。
          <br />
          商品將盡快為您寄出，請留意出貨通知。
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 px-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            返回首頁
          </Link>
          <Link
            href="/products"
            className="block w-full py-3 px-4 bg-white text-gray-600 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            繼續購物
          </Link>
        </div>
      </div>
    </div>
  );
}
