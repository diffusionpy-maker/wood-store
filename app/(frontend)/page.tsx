"use client";

import { useRef } from "react";
import { ArrowRight, Sparkles, Leaf, Award, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// --- Components ---

function InteractiveButton({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

const ParallaxImage = ({ src, alt }: { src: string, alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="overflow-hidden rounded-[2rem] h-full w-full relative group shadow-2xl shadow-primary/5">
      <motion.div style={{ y, scale: 1.1 }} className="w-full h-full bg-muted">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        {/* Placeholder for actual image */}
        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 text-9xl font-serif italic bg-muted/50">
          Image
        </div>
      </motion.div>
    </div>
  );
}


export default function FrontendHome() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden" ref={containerRef}>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply animate-pulse duration-[8000ms]" />
          <div className="absolute bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-muted/30 rounded-full blur-[150px] mix-blend-multiply" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground tracking-widest">MuQi Select 2025</span>

            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-foreground tracking-tighter mb-8 leading-[0.9]">
              Nature <span className="font-serif italic text-primary/80">meets</span> <br />
              <span className="relative inline-block">
                Living.
                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-6 text-primary/20 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              讓森林的氣息流動於居家空間。<br className="hidden md:inline" />
              我們不僅挑選家具，更為您策展一種回歸純粹的生活方式。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/products">
                <InteractiveButton className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium overflow-hidden shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  <span className="relative z-10 flex items-center gap-2">
                    開始探索
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </InteractiveButton>
              </Link>

              <Link href="/about">
                <Button variant="ghost" size="lg" className="rounded-full px-8 text-lg font-normal hover:bg-transparent hover:text-primary gap-2 group">
                  品牌故事
                  <div className="w-8 h-[1px] bg-foreground group-hover:w-12 group-hover:bg-primary transition-all" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- FEATURES SCROLL --- */}
      <section className="py-32 bg-background relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 mb-16 flex items-end justify-between">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-foreground">
              Curated <br /> <span className="font-serif italic text-muted-foreground">Collections.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link href="/products" className="group hidden md:flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
              View All
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="w-full overflow-x-auto pb-12 hide-scrollbar ps-6 md:ps-[max(2rem,calc((100vw-80rem)/2))]">
          <div className="flex gap-6 md:gap-10 w-max pr-6">
            {[
              { title: "嚴選家具", sub: "Furniture", icon: <Leaf className="w-6 h-6" />, desc: "職人手作，溫潤觸感。", link: "/products?category=furniture" },
              { title: "AI 智能選品", sub: "AI Select", icon: <Sparkles className="w-6 h-6" />, desc: "科技與美學的精準契合。", link: "/ai-select" },
              { title: "生活器物", sub: "Lifestyle", icon: <Clock className="w-6 h-6" />, desc: "日常細節的質感提升。", link: "/products?category=lifestyle" },
              { title: "品質保證", sub: "Warranty", icon: <ShieldCheck className="w-6 h-6" />, desc: "五年保固，安心陪伴。", link: "/about" },
            ].map((item, i) => (
              <Link href={item.link} key={i}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="w-[280px] md:w-[360px] h-[420px] md:h-[500px] rounded-[2.5rem] bg-muted/10 border border-white/50 relative overflow-hidden group p-8 md:p-10 flex flex-col justify-between transition-colors hover:bg-white/40 shadow-sm hover:shadow-xl"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/20 transition-colors duration-500" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-normal text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase opacity-60">{item.sub}</p>
                  </div>

                  <div className="relative z-10">
                    <p className="text-sm font-light text-muted-foreground leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      {item.desc}
                    </p>
                    <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-32 bg-muted/10 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal direction="right" className="order-2 lg:order-1 relative">
              <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0">
                <ParallaxImage src="" alt="Craftsmanship" />
                {/* Floating Badge */}
                <div className="absolute -bottom-10 -right-10 bg-background/80 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white/50 max-w-[200px] hidden md:block">
                  <p className="font-serif italic text-2xl text-primary mb-2">"Quality"</p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">
                    is not just about durability, but the feeling of home.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="order-1 lg:order-2 space-y-10">
              <ScrollReveal delay={0.2}>
                <h2 className="text-4xl md:text-6xl font-light leading-tight text-foreground">
                  Crafting <br />
                  <span className="font-serif italic text-muted-foreground">Timeless</span> <br />
                  Memories.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="space-y-6 text-muted-foreground font-light text-lg leading-loose">
                  <p>
                    每一件木栖所的選品，都承載著對自然的敬意。我們深入北歐與日本的工坊，尋找那些能經得起時間考驗的設計。
                  </p>
                  <p>
                    不只是家具，而是家中溫暖的陪伴者。隨著歲月推移，木紋的色澤將更加溫潤，記錄下屬於您的生活故事。
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <Link href="/about" className="inline-block">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 border-primary/20 hover:bg-primary/5 hover:border-primary text-base font-normal tracking-wide transition-all">
                    閱讀更多故事
                  </Button>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-8xl font-light text-foreground mb-8 tracking-tighter">
              Ready to <span className="text-primary italic font-serif">Transform?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto">
              加入會員，開啟您的北歐生活質感之旅。
            </p>
            <div className="flex justify-center">
              <Link href="/products">
                <InteractiveButton className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-lg md:text-xl shadow-2xl hover:scale-110 transition-transform duration-300">
                  <img src="/images/20251226_logo_only_001.svg" alt="GO" className="w-1/2 h-1/2 object-contain invert brightness-0" />
                </InteractiveButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
