"use client";

import { Leaf, Recycle, Users, Sprout, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] animate-pulse duration-[5000ms]" />
        </div>

        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground tracking-widest">BRAND STORY</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            We are <span className="font-medium text-primary">MuQi.</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            我們相信，好的設計不應只是視覺的享受，<br />
            更是生活中溫柔的陪伴。
          </p>
        </ScrollReveal>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <ScrollReveal direction="right">
              <div className="aspect-square rounded-[2.5rem] bg-muted/20 relative overflow-hidden group shadow-2xl shadow-primary/5">
                <img src="/images/20251226_logo_std.png" alt="MuQi Story" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-light tracking-tight">源自自然的靈感</h2>
                <div className="space-y-6 text-lg text-muted-foreground font-light leading-loose">
                  <p>
                    木栖所成立於 2024 年，我們的初衷很簡單：在這個繁忙的數位時代，為人們找回一絲自然的寧靜。
                  </p>
                  <p>
                    每一塊木頭都有它的故事，從森林到工坊，再到您的家中。我們嚴選來自北歐與日本的永續林場木材，透過職人雙手，轉化為溫潤的日常器物。
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 md:py-32 bg-secondary/5">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-light text-center mb-20 tracking-tight">核心理念</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard delay={0.1} icon={<Leaf />} title="永續環保" desc="堅持使用認證環保木材，為地球的未來盡一份心力。" />
            <ValueCard delay={0.2} icon={<Users />} title="職人精神" desc="與在地工坊合作，傳承世代相傳的精湛工藝。" />
            <ValueCard delay={0.3} icon={<Recycle />} title="循環設計" desc="產品設計考量生命週期，致力於減少資源浪費。" />
            <ValueCard delay={0.4} icon={<Sprout />} title="自然共生" desc="讓居家空間成為自然的一部分，生活即是森呼吸。" />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <ScrollReveal delay={0.2}>
            <div className="py-16 px-8 bg-background/50 backdrop-blur-md rounded-[3rem] border border-white/50 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8">我們的願景</h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light italic">
                "透過 AI 選物、精選商品、品牌活動，<br />木栖所希望讓更多人感受木作的美好，<br />一起探索木作世界的無限可能。"
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <ScrollReveal delay={delay} className="group h-full">
      <div className="bg-background/50 backdrop-blur-md border border-white/40 p-10 rounded-[2rem] h-full transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-3">{title}</h3>
        <p className="text-muted-foreground font-light leading-relaxed">
          {desc}
        </p>
      </div>
    </ScrollReveal>
  );
}
