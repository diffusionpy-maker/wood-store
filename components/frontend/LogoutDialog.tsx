"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, AlertCircle } from "lucide-react";

export default function LogoutDialog({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setOpen(false)}
      />

      {/* Dialog Content */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] p-8 w-80 text-center border border-white/20 ring-1 ring-black/5 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <LogOut className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">確定要登出嗎？</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            登出後您將無法使用會員專屬功能，
            <br />
            需要重新登入才能繼續。
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            取消
          </button>
          <button
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-200"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
              onConfirm();
            }}
          >
            確認登出
          </button>
        </div>
      </div>
    </div>
  );
}
