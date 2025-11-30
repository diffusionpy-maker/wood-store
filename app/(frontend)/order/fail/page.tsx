import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function OrderFailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">付款失敗</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          很抱歉，您的付款程序未能完成。
          <br />
          請確認您的信用卡資訊或稍後再試。
        </p>

        <div className="space-y-3">
          <Link
            href="/order"
            className="block w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            重新嘗試付款
          </Link>
          <Link
            href="/contact"
            className="block w-full py-3 px-4 bg-white text-gray-600 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            聯繫客服協助
          </Link>
        </div>
      </div>
    </div>
  );
}
