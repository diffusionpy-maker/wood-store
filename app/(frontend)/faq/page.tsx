"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    { q: "木製家具需要特別保養嗎？", a: "是的，建議每季使用天然護木油保養一次，並避免陽光直射與極度潮濕的環境。" },
    { q: "運送範圍包含離島嗎？", a: "目前運送範圍僅限台灣本島，離島地區請洽詢客服安排特殊配送。" },
    { q: "商品有保固嗎？", a: "大型家具皆享有 5 年結構保固，部分家飾品享有 1 年保固。" },
    { q: "可以訂製尺寸嗎？", a: "部分實木家具提供客製化服務，請參考商品頁面說明或與我們聯繫。" },
    { q: "退換貨政策為何？", a: "享有 7 天鑑賞期。若商品有瑕疵，請於收到貨後 3 日內反應，我們將免費更換。" },
    { q: "如何購買木栖所商品？", a: "請於精選商品頁面選擇您喜愛的商品，加入購物車後依照步驟完成結帳流程。我們支援多種付款方式，包括信用卡、ATM 轉帳等。" },
    { q: "AI選物是什麼？", a: "AI選物是我們獨家開發的智能推薦系統，會根據您的居家風格偏好、預算以及空間大小，為您推薦最適合的木作商品組合，讓選購變得更輕鬆。" },
    { q: "運費如何計算？", a: "全館消費滿 NT$ 2,000 即享免運優惠。未滿免運門檻，宅配運費為 NT$ 100，超商取貨運費為 NT$ 60。" }
  ];

  return (
    <div className="bg-background min-h-screen py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

<section className="relative py-32 md:py-48 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <ScrollReveal className="text-center mb-16">
          
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground tracking-widest">FAQ</span>

            </div>
          
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-6">
            Frequently Asked <span className="text-primary font-normal">Questions</span>
          </h1>
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            關於產品保養、運送與售後服務的常見問題。
          </p>
        </ScrollReveal>
</section>

      <div className="container mx-auto max-w-3xl relative z-10">
        

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <AccordionItem value={`item-${index}`} className="border border-border/50 rounded-2xl px-6 bg-white/40 backdrop-blur-sm data-[state=open]:bg-white/60 data-[state=open]:shadow-md transition-all duration-300">
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </ScrollReveal>
          ))}
        </Accordion>

        <div className="mt-20 pt-10 border-t border-border/50 text-center">
          <p className="text-muted-foreground mb-6 font-light">找不到您要的答案嗎？</p>
          <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-[1.02] gap-2">
            <Link href="/contact">
              <MessageCircle className="w-4 h-4" />
              聯繫客服中心
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
