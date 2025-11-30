"use client";
import { useCartStore } from "@/lib/cartStore";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-2 mb-8 text-gray-500 hover:text-emerald-600 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <Link href="/products">繼續購物</Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-emerald-600" />
          購物車
          <span className="text-base font-normal text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            {cart.length} 件商品
          </span>
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">購物車目前沒有商品</h2>
            <p className="text-gray-500 mb-8">去逛逛精選商品，尋找您的心頭好吧！</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-1"
            >
              前往選購
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cart.map((p, idx) => (
                <div
                  key={p.id + '-' + idx}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-emerald-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg mb-1">{p.name}</h3>
                      <p className="text-sm text-gray-500">規格：標準版</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="font-bold text-gray-900 text-lg">
                      NT$ {p.price.toLocaleString()}
                    </div>
                    <button
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      onClick={() => removeFromCart(p.id)}
                      aria-label="移除商品"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">訂單摘要</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>小計</span>
                    <span>NT$ {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>運費</span>
                    <span className="text-emerald-600 font-medium">免運費</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-bold text-gray-800">總金額</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      NT$ {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/order"
                  className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2 group"
                >
                  前往結帳
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-xs text-gray-400 text-center mt-4">
                  結帳即表示您同意我們的服務條款與隱私政策
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
