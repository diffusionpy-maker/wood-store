"use client";

import { ArrowRight, Sparkles, Leaf, Award } from "lucide-react";
import Link from "next/link";
import HomeCard from "@/components/frontend/HomeCard";

export default function FrontendHome() {
  // 主題分區資料
  const sections = [
    {
      title: "精選商品",
      desc: "探索木栖所嚴選木作好物，設計感與實用兼具。",
      link: "/products",
      icon: <Leaf className="w-8 h-8" />,
      btn: "前往選購",
      color: "#059669"
    },
    {
      title: "AI選物",
      desc: "AI智能推薦，找到最適合你的木作商品。",
      link: "/ai-select",
      icon: <Sparkles className="w-8 h-8" />,
      btn: "立即體驗",
      color: "#7c3aed"
    },
    {
      title: "品牌故事",
      desc: "了解木栖所的品牌理念與職人精神。",
      link: "/about",
      icon: <Award className="w-8 h-8" />,
      btn: "閱讀更多",
      color: "#d97706"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse duration-[5000ms]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4" />
              <span>2025 全新系列上市</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              讓自然<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">溫暖</span>你的生活
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              木栖所 MuQi Select 致力於為您挑選最優質的木製家居用品，
              <br className="hidden md:block" />
              結合傳統工藝與現代設計，打造舒適愜意的居家空間。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link
                href="/products"
                className="px-8 py-4 rounded-full bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                立即探索
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 rounded-full bg-white text-gray-700 font-bold text-lg border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 flex items-center justify-center"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sections.map((s, index) => (
              <div key={s.title} className="h-full animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                <HomeCard {...s} href={s.link} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">準備好改造您的空間了嗎？</h2>
              <p className="text-gray-300 mb-8 text-lg">
                加入我們的會員，立即享有首購優惠與專屬選物服務。
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-gray-900 font-bold hover:bg-emerald-50 transition-colors duration-300"
              >
                免費加入會員
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}