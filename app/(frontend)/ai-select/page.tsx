"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles, ArrowRight, Wand2, Ruler, DollarSign, Home, Check, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AiSelectPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      document.getElementById('ai-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("AI 正在為您生成推薦清單...");
      }, 2000);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20 selection:bg-primary/20 relative overflow-hidden">
      {/* Background Ambience - Softer and larger */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse-slow"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-muted/20 rounded-full blur-[120px] -z-10 animate-pulse-slow delay-1000"></div>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-40">
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground tracking-widest">AI Intelligent Selection</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extralight text-foreground mb-8 tracking-tighter leading-tight">
              Curate Your <br />
              <span className="font-normal text-primary relative inline-block">
                Nordic Lifestyle
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-14 leading-relaxed tracking-wide">
              透過 AI 分析您的空間與品味，<br className="hidden md:inline" />
              量身打造專屬的北歐居家配置提案。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <Button
              size="lg"
              className="rounded-full px-12 h-16 text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 gap-2 font-light border border-primary/20 bg-background/50 hover:bg-background/80 backdrop-blur-sm text-foreground"
              onClick={() => document.getElementById('ai-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Wand2 className="w-5 h-5 text-primary" />
              開始體驗 AI 選品
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Form Section */}
      <div id="ai-form" className="container mx-auto px-4 relative z-20 max-w-5xl">
        <div className="bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-primary/5 border border-white/60 overflow-hidden ring-1 ring-white/50">
          {/* Progress Bar */}
          <div className="bg-white/20 border-b border-white/40 backdrop-blur-md">
            <div className="flex justify-between items-center px-6 py-8 md:px-20">
              <StepItem number={1} title="空間風格" active={step >= 1} current={step === 1} />
              <div className={cn("flex-1 h-[1px] mx-4 transition-all duration-1000", step >= 2 ? 'bg-primary/50' : 'bg-border/30')}></div>
              <StepItem number={2} title="預算範圍" active={step >= 2} current={step === 2} />
              <div className={cn("flex-1 h-[1px] mx-4 transition-all duration-1000", step >= 3 ? 'bg-primary/50' : 'bg-border/30')}></div>
              <StepItem number={3} title="智能分析" active={step >= 3} current={step === 3} />
            </div>
          </div>

          <div className="p-8 md:p-20 min-h-[600px] flex flex-col justify-center relative">
            {/* Content */}
            <div className="relative">
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <h2 className="text-3xl md:text-4xl font-light text-foreground mb-16 text-center tracking-tight">
                    您偏好的居家風格是？
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StyleOption
                      title="Muji"
                      subtitle="日式無印"
                      desc="簡約．溫潤．自然"
                      selected={selectedStyle === 'muji'}
                      onClick={() => { setSelectedStyle('muji'); setTimeout(handleNext, 500); }}
                    />
                    <StyleOption
                      title="Nordic"
                      subtitle="北歐極簡"
                      desc="明亮．功能．幾何"
                      selected={selectedStyle === 'nordic'}
                      onClick={() => { setSelectedStyle('nordic'); setTimeout(handleNext, 500); }}
                    />
                    <StyleOption
                      title="Luxury"
                      subtitle="現代輕奢"
                      desc="精緻．質感．沉穩"
                      selected={selectedStyle === 'luxury'}
                      onClick={() => { setSelectedStyle('luxury'); setTimeout(handleNext, 500); }}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-700 max-w-2xl mx-auto w-full">
                  <h2 className="text-3xl md:text-4xl font-light text-foreground mb-16 text-center tracking-tight">
                    您的預算範圍大約是？
                  </h2>
                  <div className="space-y-6">
                    <BudgetOption
                      label="小資輕裝"
                      price="NT$ 5,000 以下"
                      sub="適合租屋族或單品添購"
                      selected={selectedBudget === 'low'}
                      onClick={() => { setSelectedBudget('low'); setTimeout(handleNext, 500); }}
                    />
                    <BudgetOption
                      label="質感升級"
                      price="NT$ 5,000 - 15,000"
                      sub="適合注重生活品質的小家庭"
                      selected={selectedBudget === 'mid'}
                      onClick={() => { setSelectedBudget('mid'); setTimeout(handleNext, 500); }}
                    />
                    <BudgetOption
                      label="完美居家"
                      price="NT$ 15,000 以上"
                      sub="打造理想中的夢幻空間"
                      selected={selectedBudget === 'high'}
                      onClick={() => { setSelectedBudget('high'); setTimeout(handleNext, 500); }}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in zoom-in-95 duration-1000 max-w-3xl mx-auto w-full text-center">
                  <div className="mb-12">
                    <div className="w-24 h-24 bg-primary/5 rounded-full mx-auto flex items-center justify-center mb-6 ring-1 ring-primary/20 animate-pulse">
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 tracking-tight">
                      AI Process Ready
                    </h2>
                    <p className="text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
                      我們已經收集了您的偏好，<br />即將為您生成專屬的空間提案。
                    </p>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="h-16 px-12 rounded-full text-lg shadow-2xl shadow-primary/20 hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-wide gap-3"
                  >
                    {loading ? (
                      <>
                        <ScanLine className="w-5 h-5 animate-spin" />
                        正在分析空間...
                      </>
                    ) : (
                      <>
                        開始生成提案 <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepItem({ number, title, active, current }: { number: number; title: string; active: boolean; current?: boolean }) {
  return (
    <div className={cn("flex items-center gap-4", active ? 'text-primary' : 'text-muted-foreground/50')}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 border",
        current ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-110' :
          active ? 'bg-primary/10 text-primary border-primary/20' : 'bg-transparent border-muted-foreground/30 text-muted-foreground/50'
      )}>
        {active && !current ? <Check className="w-5 h-5" /> : number}
      </div>
      <span className={cn(
        "text-sm font-medium hidden md:block transition-all duration-300 tracking-wide",
        active ? 'text-foreground' : ''
      )}>
        {title}
      </span>
    </div>
  );
}

function StyleOption({ title, subtitle, desc, selected, onClick }: { title: string; subtitle: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative aspect-[3/4] rounded-[2rem] overflow-hidden text-left w-full transition-all duration-500",
        selected
          ? "ring-4 ring-primary/20 shadow-xl shadow-primary/10 scale-[1.02]"
          : "hover:shadow-2xl hover:shadow-primary/5 ring-1 ring-border/0 hover:ring-border/50"
      )}
    >
      <div className={cn("absolute inset-0 bg-muted/20 transition-colors duration-500", selected && "bg-primary/5")} />
      {/* Simulation of image using gradient - replace with real image in production */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Decorative Title moved to avoid collision and ensured subtle look */}
        <h3 className="text-5xl font-thin text-white/10 absolute top-8 left-8 select-none tracking-widest pointer-events-none">{title}</h3>

        <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h4 className="text-2xl font-light text-white mb-2 group-hover:text-primary-foreground transition-colors">{subtitle}</h4>
          <div className="h-[1px] w-12 bg-white/50 mb-4 group-hover:w-full transition-all duration-700 ease-out" />
          <p className="text-white/80 text-sm font-light tracking-wider opacity-90 group-hover:opacity-100 transition-opacity">{desc}</p>
        </div>
      </div>

      <div className={cn(
        "absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 backdrop-blur-md z-20",
        selected ? "bg-primary text-primary-foreground opacity-100 border-primary" : "bg-white/10 text-white opacity-0 group-hover:opacity-100"
      )}>
        <Check className="w-5 h-5" />
      </div>
    </button>
  );
}

function BudgetOption({ label, price, sub, selected, onClick }: { label: string, price: string, sub: string, selected: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-8 rounded-[2rem] border bg-white/40 backdrop-blur-sm text-left transition-all duration-300 flex items-center justify-between group",
        selected
          ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5"
          : "border-white/50 hover:bg-white/60 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className={cn("text-xl font-medium tracking-wide transition-colors", selected ? "text-primary" : "text-foreground")}>{label}</span>
          <span className="px-3 py-1 rounded-full bg-white/50 border border-white/50 text-xs text-muted-foreground font-light uppercase tracking-wider">{price}</span>
        </div>
        <span className="text-sm text-muted-foreground/80 font-light">{sub}</span>
      </div>

      <div className={cn(
        "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
        selected
          ? "bg-primary border-primary text-primary-foreground"
          : "border-border/50 bg-white/50 text-transparent group-hover:border-primary/30"
      )}>
        <Check className="w-5 h-5" />
      </div>
    </button>
  );
}
