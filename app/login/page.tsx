'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Loader2, ArrowRight, Check } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function LoginFormContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      // 前台登入不論身分都只導向前台
      router.push(searchParams?.get('callbackUrl') ?? '/');
    } else {
      setError('帳號或密碼錯誤，請再試一次');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* 背景動態光暈 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[100px] animate-blob mix-blend-multiply" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply" />
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-sky-100/40 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply" />
      </div>

      {/* 左上角返回按鈕 */}
      <a
        href="/"
        className="absolute top-6 left-6 z-20 group flex items-center gap-3 text-slate-500 hover:text-slate-800 transition-all duration-300"
      >
        <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
          <span className="font-bold text-lg text-slate-700">木</span>
        </div>
        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-medium tracking-wide">
          返回首頁
        </span>
      </a>

      {/* 主卡片容器 */}
      <div
        className={`relative z-10 w-full max-w-[1000px] h-auto min-h-[600px] grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* 左側：品牌視覺 (佔 5/12) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
          {/* 背景圖與遮罩 */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610505466017-7ae225688429?q=80&w=2942&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-[20s] hover:scale-110 ease-linear"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90"></div>

          {/* 頂部 Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="text-xl">🌲</span>
              </div>
              <span className="text-lg font-medium tracking-wider text-white/90">WOOD STORE</span>
            </div>
          </div>

          {/* 底部文字 */}
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight">
                探索自然的
                <br />
                <span className="text-blue-400">純粹紋理</span>
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xs font-light">
                每一塊木頭都有屬於它的故事。加入我們，一同探索、競標，收藏大自然的鬼斧神工。
              </p>
            </div>

            {/* 裝飾性標籤 */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-white/80">
                # 頂級木材
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-white/80">
                # 公平競標
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-white/80">
                # 專業鑑定
              </span>
            </div>
          </div>
        </div>

        {/* 右側：登入表單 (佔 7/12) */}
        <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">歡迎回來</h2>
              <p className="text-slate-500 text-sm">請選擇您習慣的方式登入系統</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Email Input */}
                <div
                  className={`relative group transition-all duration-300 ${emailFocused ? 'scale-[1.02]' : ''}`}
                >
                  <label
                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${emailFocused || (typeof document !== 'undefined' && (document.querySelector('input[name="email"]') as HTMLInputElement)?.value) ? 'top-2 text-xs text-blue-500' : 'top-1/2 -translate-y-1/2 text-slate-400'}`}
                  >
                    電子郵件
                  </label>
                  <Input
                    name="email"
                    type="email"
                    className="pl-10 pr-4 h-12 border-slate-200 bg-slate-50/50 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-700 pt-4 pb-1"
                    required
                    onFocus={() => setEmailFocused(true)}
                    onBlur={(e) => setEmailFocused(e.target.value !== '')}
                  />
                  <Mail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${emailFocused ? 'text-blue-500' : 'text-slate-400'}`}
                  />
                </div>

                {/* Password Input */}
                <div
                  className={`relative group transition-all duration-300 ${passwordFocused ? 'scale-[1.02]' : ''}`}
                >
                  <label
                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${passwordFocused || (typeof document !== 'undefined' && (document.querySelector('input[name="password"]') as HTMLInputElement)?.value) ? 'top-2 text-xs text-blue-500' : 'top-1/2 -translate-y-1/2 text-slate-400'}`}
                  >
                    密碼
                  </label>
                  <Input
                    name="password"
                    type="password"
                    className="pl-10 pr-4 h-12 border-slate-200 bg-slate-50/50 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-700 pt-4 pb-1"
                    required
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={(e) => setPasswordFocused(e.target.value !== '')}
                  />
                  <Lock
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${passwordFocused ? 'text-blue-500' : 'text-slate-400'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center transition-colors group-hover:border-blue-500 bg-white">
                    <Check className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-slate-500 group-hover:text-slate-700 transition-colors">
                    記住我
                  </span>
                </label>
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors hover:underline decoration-2 underline-offset-4"
                >
                  忘記密碼？
                </a>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-500 text-sm flex items-center gap-2 animate-shake">
                  <div className="w-1 h-1 rounded-full bg-red-500"></div>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-base font-medium shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                ) : (
                  <span className="flex items-center">
                    登入系統{' '}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-100"></div>
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                其他登入方式
              </span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-12 bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-600 rounded-xl transition-all duration-300 group"
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                <svg
                  className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      fill="#4285F4"
                      d="M12 11v2.7h6.2c-.3 1.4-1.7 4-6.2 4-3.7 0-6.7-3-6.7-6.7s3-6.7 6.7-6.7c2.1 0 3.5.8 4.3 1.5l2.9-2.8C18.1 2.7 15.3 1.3 12 1.3 6.5 1.3 2 5.8 2 11.3s4.5 10 10 10c5.7 0 9.5-4 9.5-9.7 0-.7-.1-1.2-.2-1.6H12z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.3c3.1 0 5.7-1 7.6-2.7l-3.6-2.9c-1 .7-2.3 1.1-4 1.1-3.1 0-5.7-2.1-6.6-5.1H2.2v3.2C4.1 18.7 7.7 21.3 12 21.3z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.4 13.8c-.2-.7-.4-1.4-.4-2.3s.2-1.6.4-2.3V6H2.2C1.4 7.6 1 9.4 1 11.3c0 1.9.4 3.7 1.2 5.3l3.2-2.8z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.6c1.7 0 2.9.7 3.6 1.3l2.7-2.7C16.7 2.7 14.5 1.3 12 1.3c-4.3 0-7.9 2.6-9.8 6.3l3.2 2.8c.9-2.9 3.5-5.1 6.6-5.1z"
                    />
                  </g>
                </svg>
                Google
              </Button>
              <Button
                type="button"
                className="h-12 w-full rounded-xl shadow-none border border-[#06C755] bg-[#06C755] text-white hover:bg-[#05b34c] transition-all flex items-center justify-center"
                onClick={() => signIn('line', { callbackUrl: '/' })}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="8" fill="#06C755" />
                  <path d="M18 8C11.9249 8 7 11.9249 7 16.5C7 19.2222 8.85714 21.6111 11.7143 23.0556L10.8571 26.2222C10.7143 26.6667 11.1429 27.0556 11.5714 26.8889L15.2857 25.3333C16.1429 25.4444 17.0714 25.5 18 25.5C24.0751 25.5 29 21.5751 29 17C29 12.4249 24.0751 8 18 8Z" fill="white"/>
                </svg>
                LINE
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default function FrontendLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin w-10 h-10 text-slate-400" />
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
}
