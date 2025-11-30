"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "如何購買木栖所商品？",
    a: "請於精選商品頁面選擇您喜愛的商品，加入購物車後依照步驟完成結帳流程。我們支援多種付款方式，包括信用卡、ATM 轉帳等。"
  },
  {
    q: "AI選物是什麼？",
    a: "AI選物是我們獨家開發的智能推薦系統，會根據您的居家風格偏好、預算以及空間大小，為您推薦最適合的木作商品組合，讓選購變得更輕鬆。"
  },
  {
    q: "運費如何計算？",
    a: "全館消費滿 NT$ 2,000 即享免運優惠。未滿免運門檻，宅配運費為 NT$ 100，超商取貨運費為 NT$ 60。"
  },
  {
    q: "收到商品後可以退換貨嗎？",
    a: "我們提供 7 天鑑賞期服務。若商品有瑕疵或不符合預期，請保持商品完整包裝，並於收到商品 7 天內聯繫客服辦理退換貨。"
  },
  {
    q: "如何聯絡客服？",
    a: "您可至「聯絡客服」頁面填寫表單，或直接來信 service@muqiselect.com，我們將於工作日 24 小時內回覆您的問題。"
  }
];

export default function FaqPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-emerald-50/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">常見問題</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            這裡整理了大家最常問的問題，希望能為您解答疑惑。
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">找不到您要的答案嗎？</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <HelpCircle className="w-5 h-5" />
            聯繫客服中心
          </a>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-800 text-lg">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}
