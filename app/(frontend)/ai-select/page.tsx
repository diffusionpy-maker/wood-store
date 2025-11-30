"use client";

import { Sparkles, Bot, ArrowRight, BrainCircuit } from "lucide-react";

export default function AiSelectPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4" />
            <span>AI 智能選物系統</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            讓 AI 為您打造
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">專屬的居家風格</span>
          </h1>

          <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            結合大數據分析與您的個人喜好，
            <br />
            為您推薦最適合的木作家具組合，讓選購變得更輕鬆、更精準。
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-200 transition-colors">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4 mx-auto">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">智能分析</h3>
              <p className="text-gray-500 text-sm">分析您的空間數據與風格偏好</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-200 transition-colors">
              <div className="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center text-fuchsia-600 mb-4 mx-auto">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">精準推薦</h3>
              <p className="text-gray-500 text-sm">從千款商品中挑選最佳組合</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-violet-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">風格預覽</h3>
              <p className="text-gray-500 text-sm">即時預覽搭配效果</p>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            <button className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed">
              即將推出
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-sm text-gray-400">預計 2025 Q2 上線，敬請期待</p>
          </div>
        </div>
      </div>
    </div>
  );
}
