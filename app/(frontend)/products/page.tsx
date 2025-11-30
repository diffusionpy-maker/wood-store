"use client";
import { useCartStore } from "@/lib/cartStore";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "wood01",
    name: "木栖所體驗組",
    price: 1280,
    desc: "適合初次接觸木作的您，包含基礎餐具與保養油。",
    tag: "熱銷"
  },
  {
    id: "wood02",
    name: "木栖所經典組",
    price: 1980,
    desc: "精選胡桃木製作，包含托盤、杯墊與攪拌匙。",
    tag: "推薦"
  },
  {
    id: "wood03",
    name: "木栖所尊爵組",
    price: 3280,
    desc: "大師級手工雕刻，限量發售，極具收藏價值。",
    tag: "限量"
  },
];

export default function ProductsPage() {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">精選商品</h1>
            <p className="text-gray-500">嚴選優質木作，為生活增添溫度</p>
          </div>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-gray-700 font-medium shadow-sm hover:shadow-md hover:text-emerald-600 transition-all duration-300 border border-gray-200"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>購物車</span>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">
              {cart.length}
            </span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {p.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs text-gray-400 font-medium">4.9</span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
                  {p.desc}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="text-emerald-600 font-bold text-xl">
                    NT$ {p.price.toLocaleString()}
                  </div>
                  <button
                    className="p-3 rounded-xl bg-gray-900 text-white hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-emerald-200 active:scale-95 duration-200"
                    onClick={() => addToCart(p)}
                    aria-label="加入購物車"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
