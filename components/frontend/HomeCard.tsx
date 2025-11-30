import { Gift, Sparkles, Info, HelpCircle, Headset, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface HomeCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  btn: string;
  color?: string;
}

export default function HomeCard({ icon, title, desc, href, btn, color }: HomeCardProps) {
  return (
    <div className="group relative h-full">
      {/* Background Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>

      <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        {/* Icon Circle */}
        <div
          className="mb-4 p-4 rounded-full bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300 relative overflow-hidden"
          style={{ color: color || '#059669' }}
        >
          <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {icon}
          </div>
          <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>

        <h2 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
          {title}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
          {desc}
        </p>

        <Link
          href={href}
          className="w-full mt-auto py-2.5 px-4 rounded-lg bg-gray-50 text-gray-600 font-medium hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          {btn}
          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
}
