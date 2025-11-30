import { Button } from "@/components/ui/button";
import { useState } from "react";

// LINE 官方 SVG logo
const LineIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#00C300"/><path fill="#fff" d="M24 14c-5.5 0-10 3.6-10 8.1 0 2.6 1.7 4.9 4.3 6.4-.2.7-.6 2.2-.7 2.5-.1.3.1.3.2.3.2 0 2.5-.4 4.1-1.2.7.1 1.5.2 2.1.2 5.5 0 10-3.6 10-8.1S29.5 14 24 14zm-2.2 10.7c-.2.2-.5.4-.8.5-.5.2-1 .3-1.5.4-.2 0-.3-.2-.2-.3.1-.3.5-1.7.7-2.4.1-.3.2-.4.4-.5.2-.1.4-.1.6 0 .2.1.3.2.4.4.1.2.1.4 0 .6zm2.2 1.1c-.6 0-1.2-.1-1.7-.2-.2 0-.3-.2-.2-.3.1-.3.5-1.7.7-2.4.1-.3.2-.4.4-.5.2-.1.4-.1.6 0 .2.1.3.2.4.4.1.2.1.4 0 .6-.2.7-.6 2.1-.7 2.4-.1.1-.2.2-.3.2zm2.2-1.1c-.2.2-.5.4-.8.5-.5.2-1 .3-1.5.4-.2 0-.3-.2-.2-.3.1-.3.5-1.7.7-2.4.1-.3.2-.4.4-.5.2-.1.4-.1.6 0 .2.1.3.2.4.4.1.2.1.4 0 .6zm2.2 1.1c-.6 0-1.2-.1-1.7-.2-.2 0-.3-.2-.2-.3.1-.3.5-1.7.7-2.4.1-.3.2-.4.4-.5.2-.1.4-.1.6 0 .2.1.3.2.4.4.1.2.1.4 0 .6-.2.7-.6 2.1-.7 2.4-.1.1-.2.2-.3.2z"/></svg>
);

export default function LineLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLineLogin = () => {
    setLoading(true);
    const channelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID!;
    const callbackUrl = process.env.NEXT_PUBLIC_LINE_CALLBACK_URL!;
    const state = Math.random().toString(36).substring(2, 15); // 可自訂
    const scope = "profile%20openid%20email";
    const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${encodeURIComponent(callbackUrl)}&state=${state}&scope=${scope}`;
    window.location.href = lineAuthUrl;
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center bg-green-600 text-white hover:bg-green-700 transition-colors rounded-lg py-2 text-base font-semibold shadow-sm cursor-pointer"
      onClick={handleLineLogin}
      disabled={loading}
    >
      <LineIcon />
      {loading ? "登入中..." : "LINE 一鍵登入"}
    </Button>
  );
}
