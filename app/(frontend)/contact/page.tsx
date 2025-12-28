"use client";

import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSuccess(true), 1000);
  };

  return (
    <div className="bg-background min-h-screen relative overflow-hidden flex items-center justify-center py-20 px-4 selection:bg-primary/20">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] animate-pulse duration-[7000ms]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-muted/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Contact Info */}
        <div className="space-y-10">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground">
              Get in <span className="font-serif italic text-primary">Touch.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light mt-6 max-w-md leading-relaxed">
              我們很樂意聽取您的建議，或為您的選購提供專業協助。
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            <ContactItem delay={0.2} icon={<Mail className="w-5 h-5" />} title="Email Us" content="service@muqi-wood.com" />
            <ContactItem delay={0.3} icon={<Phone className="w-5 h-5" />} title="Call Us" content="+886 2 1234 5678" />
            <ContactItem delay={0.4} icon={<MapPin className="w-5 h-5" />} title="Visit Us" content="台北市信義區松高路1號 (預約制)" />
          </div>
        </div>

        {/* Contact Form */}
        <ScrollReveal direction="left" delay={0.2}>
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5">
            {success ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light">Message Sent!</h3>
                <p className="text-muted-foreground font-light">我們會盡快與您聯繫。</p>
                <Button variant="outline" onClick={() => setSuccess(false)} className="mt-4">Send another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-primary/10 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    placeholder="您的稱呼"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-primary/10 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    placeholder="您的 Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl bg-white/60 border border-primary/10 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                    placeholder="請輸入您的訊息..."
                  ></textarea>
                </div>
                <Button type="submit" size="lg" className="w-full rounded-xl text-lg h-14 font-normal shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

function ContactItem({ icon, title, content, delay }: { icon: React.ReactNode, title: string, content: string, delay: number }) {
  return (
    <ScrollReveal delay={delay} className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/40 transition-colors cursor-default">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-1">{title}</h3>
        <p className="text-lg font-light text-foreground">{content}</p>
      </div>
    </ScrollReveal>
  );
}
