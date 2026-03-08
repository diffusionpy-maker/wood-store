"use client";

import { Leaf, Recycle, Users, Sprout, Sparkles, ArrowDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20 relative">
      {/* Global Grain/Grid Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.4]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      {/* Smooth Gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-white/80 via-transparent to-primary/5" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10">
        {/* Ambient Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[15%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse duration-[6000ms] mix-blend-multiply" />
          <div className="absolute bottom-[20%] left-[-5%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[80px] mix-blend-multiply" />
        </div>

        <ScrollReveal>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary/10 bg-white/60 backdrop-blur-xl mb-12 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:scale-105 cursor-default group">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary/80 tracking-[0.25em] uppercase group-hover:tracking-[0.35em] transition-all duration-500">The Story of MuQi</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-12 leading-[0.9] text-foreground drop-shadow-sm">
            Designing <br />
            <span className="font-serif italic text-primary relative inline-block">
              Serenity.
              <svg className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-3 sm:h-6 text-primary/20 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed tracking-wider">
            我們相信，好的設計不應只是視覺的享受，<br />
            更是生活中<span className="text-foreground font-medium decoration-primary/30 underline underline-offset-4 decoration-1">溫柔的陪伴</span>與靈魂的棲息地。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="absolute bottom-12 animate-bounce duration-[2000ms]">
          <ArrowDown className="w-6 h-6 text-primary/40" />
        </ScrollReveal>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-24 md:py-40 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <ScrollReveal direction="right" className="relative group perspective-1000">
              <div className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02] group-hover:rotate-1 will-change-transform">
                <div className="aspect-[4/5] md:aspect-square rounded-[3rem] bg-muted/20 relative overflow-hidden shadow-2xl shadow-primary/10 [mask-image:radial-gradient(white,black)]">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img
                    src="/images/20251226_logo_std.png"
                    alt="MuQi Story"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />

                  {/* Floating Badge */}
                  <div className="absolute bottom-8 right-8 bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white/50 shadow-lg max-w-[240px] hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                    <p className="font-serif italic text-3xl text-primary mb-1">Est. 2024</p>
                    <p className="text-xs text-muted-foreground/80 font-medium tracking-wider uppercase">Crafted in Taiwan / Nordic Spirit</p>
                  </div>
                </div>
              </div>

              {/* Decorative Circle behind */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl -z-10 group-hover:scale-125 transition-transform duration-700" />
            </ScrollReveal>

            <div className="space-y-12">
              <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                  Inspired by <span className="font-serif italic text-primary">Nature</span>,<br />
                  Crafted for <span className="font-serif italic text-primary">Life</span>.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="space-y-8 text-lg text-muted-foreground font-light leading-loose">
                  <p>
                    <span className="text-xl text-foreground font-medium">木栖所</span> 成立於 2024 年，我們的初衷很簡單：在這個繁忙的數位時代，為人們找回一絲自然的寧靜。
                  </p>
                  <p>
                    每一塊木頭都有它的故事，從森林到工坊，再到您的家中。我們嚴選來自北歐與日本的永續林場木材，透過職人雙手，轉化為溫潤的日常器物。我們不追求快速的時尚，而是專注於那些能經過時間淬鍊、越用越有味道的經典設計。
                  </p>
                  <div className="pt-4">
                    <Button variant="link" className="group text-primary p-0 h-auto text-lg font-normal hover:translate-x-2 transition-transform duration-300 hover:no-underline hover:ring-0 hover:ring-offset-0 hover:no-underline hover:ring-0 hover:ring-offset-0 transition-all duration-300">
                      ▎探索我們的工藝
                      <span className="flex items-center">
                        <span className="w-0 h-[1px] bg-primary transition-all duration-500 ease-out group-hover:w-12 ml-0 group-hover:ml-3 opacity-0 group-hover:opacity-100" />
                      </span>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES GRID --- */}
      <section className="py-24 md:py-32 bg-secondary/5 relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-20 left-10 text-[20vw] font-bold text-foreground/[0.02] select-none pointer-events-none font-serif leading-none">
          VALUES
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-light mb-8 tracking-tight">Our Core <span className="text-primary font-serif italic">Philosophy</span></h2>
            <p className="text-muted-foreground font-light text-lg mb-20">
              我們堅持的四大核心價值，是木栖所存在的理由，也是對您的承諾。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <ValueCard delay={0.1} icon={<Leaf />} title="Sustainability" sub="永續環保" desc="堅持使用認證環保木材，為地球的未來盡一份心力。" />
            <ValueCard delay={0.2} icon={<Users />} title="Craftsmanship" sub="職人精神" desc="與在地工坊合作，傳承世代相傳的精湛工藝。" />
            <ValueCard delay={0.3} icon={<Recycle />} title="Circular Design" sub="循環設計" desc="產品設計考量生命週期，致力於減少資源浪費。" />
            <ValueCard delay={0.4} icon={<Sprout />} title="Coexistence" sub="自然共生" desc="讓居家空間成為自然的一部分，生活即是森呼吸。" />
          </div>
        </div>
      </section>

      {/* --- VISION SECTION --- */}
      <section className="py-32 md:py-48 container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl -z-10 rounded-full opacity-50" />

          <ScrollReveal delay={0.2}>
            <div className="py-24 px-10 md:px-20 bg-white/30 backdrop-blur-2xl rounded-[4rem] border border-white/60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 group">

              <div className="mb-10 inline-flex flex-col items-center">
                <h2 className="text-xs font-bold tracking-[0.4em] text-primary/60 uppercase mb-4">Our Vision</h2>
                <div className="h-12 w-[1px] bg-primary/20"></div>
              </div>

              <p className="text-2xl md:text-4xl text-foreground leading-[1.6] font-light tracking-wide">
                <span className="font-serif italic text-primary/80 block mb-6 text-5xl md:text-6xl">"</span>
                透過 AI 選物、精選商品、品牌活動，<br />
                木栖所希望讓更多人感受<span className="text-primary font-normal">木作的美好</span>，<br />
                一起探索木作世界的無限可能。
                <span className="font-serif italic text-primary/80 block mt-6 text-5xl md:text-6xl text-right">"</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, sub, desc, delay }: { icon: React.ReactNode, title: string, sub: string, desc: string, delay: number }) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className="group h-full bg-white/40 backdrop-blur-md border border-white/50 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:bg-white/60 relative overflow-hidden">

        {/* Gradient Blob on Hover */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />

        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
          {icon}
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-medium mb-1 tracking-tight text-foreground">{title}</h3>
          <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-4">{sub}</p>
          <div className="h-[1px] w-12 bg-primary/20 mb-6 group-hover:w-full transition-all duration-700" />
          <p className="text-muted-foreground font-light leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">
            {desc}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
