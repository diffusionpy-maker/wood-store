import { Leaf, Heart, PenTool } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-50/50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              關於 <span className="text-emerald-600">木栖所</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              致力於推廣木作美學，結合設計、職人精神與現代科技，
              <br />
              讓每一件商品都蘊含溫度與故事。
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Leaf className="w-8 h-8" />}
              title="自然素材"
              desc="嚴選優質木材，堅持環保永續，讓自然溫暖您的生活空間。"
            />
            <FeatureCard
              icon={<PenTool className="w-8 h-8" />}
              title="職人精神"
              desc="結合傳統工藝與現代設計，每一件作品都是匠心獨具的藝術品。"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="用心服務"
              desc="提供最貼心的諮詢與售後服務，為您打造理想的居家生活。"
            />
          </div>

          <div className="mt-20 max-w-3xl mx-auto text-center bg-gray-50 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">我們的願景</h2>
              <p className="text-gray-600 leading-loose text-lg">
                透過 AI 選物、精選商品、品牌活動，木栖所希望讓更多人感受木作的美好。
                我們相信，木頭不只是材料，更是生活的溫度與品味。
                歡迎您加入我們的品牌旅程，一起探索木作世界的無限可能。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">{title}</h3>
      <p className="text-gray-500 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
