import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-emerald-50/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">聯絡客服</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            有任何問題或建議，歡迎填寫下方表單或直接來信，我們將盡快回覆您！
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">聯絡資訊</h2>
              <div className="space-y-6">
                <ContactItem
                  icon={<MapPin className="w-6 h-6" />}
                  title="公司地址"
                  content="台北市信義區信義路五段7號 (台北101)"
                />
                <ContactItem
                  icon={<Phone className="w-6 h-6" />}
                  title="客服專線"
                  content="(02) 2345-6789"
                />
                <ContactItem
                  icon={<Mail className="w-6 h-6" />}
                  title="電子信箱"
                  content="service@muqiselect.com"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-bold text-gray-800 mb-2">服務時間</h3>
              <p className="text-gray-600">
                週一至週五 09:00 - 18:00
                <br />
                (國定假日暫停服務)
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">您的姓名</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                  placeholder="請輸入姓名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">訊息內容</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none"
                  placeholder="請輸入您的問題或建議..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg shadow-emerald-200 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                送出訊息
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}
